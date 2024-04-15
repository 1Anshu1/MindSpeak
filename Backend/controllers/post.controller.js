import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import asyncWrapper from "../middlewares/asyncWrapper.middleware.js";
import CustomError from "../utils/customError.js";
import cloudinary from "../utils/cloudinary.util.js";
import { removeFile } from "../utils/fileRemover.util.js";

// create post
const createPost = asyncWrapper(async (req, res, next) => {
    const { title, caption, body, category } = req.body;
    if (!title || !caption || !body) {
        throw next(new CustomError(400, "required field missing"));
    }

    const existingPost = await Post.findOne({ $or: [{ title }, { caption }] });
    if (existingPost) {
        throw next(new CustomError(400, "post already exist"));
    }
    let result = undefined;
    if (req.file && req.file.path) {
        result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "blog",
        });
    }
    const post = await Post.create({
        title,
        caption,
        body,
        category,
        user: req.user.id,
        photo: {
            public_id: result.public_id,
            secure_url: result.secure_url,
        },
    });
    removeFile(req.file.path);
    res.status(201).json({ message: "post created successfully", post });
});

// update post
const updatePost = asyncWrapper(async (req, res, next) => {
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId });
    if (!post) {
        throw next(new CustomError(400, "post does not exist"));
    }
    if (req.file && req.file.path) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "blog",
        });
        await cloudinary.uploader.destroy(post.photo.public_id);
        post.photo = { public_id, secure_url };
    }
    post.title = req.body.title;
    post.caption = req.body.caption;
    post.category = req.body.category;
    post.body = req.body.body;
    post.photo = post.photo;
    await post.save();
    if (req.file && req.file.path) {
        removeFile(req.file.path);
    }

    res.status(200).json({ message: "post updated successfully", post });
});

// delete post
const deletePost = asyncWrapper(async (req, res, next) => {
    const postId = req.params.postId;

    const post = await Post.findOneAndDelete({ _id: postId });
    if (req.user.id !== post.user.toString()) {
        throw next(new CustomError(400, "You cannot delete the post"));
    }
    if (!post) {
        throw next(new CustomError(400, "post does not exist"));
    }
    // await Comment.deleteMany({ post: post._id });
    await cloudinary.uploader.destroy(post.photo.public_id);
    res.status(200).json({ message: "post deleted successfully", post });
});

// get post
const getPost = asyncWrapper(async (req, res, next) => {
    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId }).populate([
        {
            path: "user",
            select: ["avatar", "name"],
        },
        {
            path: "comments",
            populate: [
                {
                    path: "userId",
                    select: ["avatar", "name"],
                },
            ],
        },
    ]);
    if (!post) {
        throw next(new CustomError(400, "post does not exist"));
    }
    res.status(200).json({ post });
});

// get all post
const getAllPost = asyncWrapper(async (req, res, next) => {
    const filter = req.query.search || "";

    let query = { title: { $regex: filter, $options: "i" } };
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "oldest" ? 1 : -1;

    if (req.query.user) {
        query = { ...query, user: req.query.user };
    }
    if (req.query.category) {
        query = { ...query, category: req.query.category };
    }
    if (req.query.postId) {
        query = { ...query, _id: req.query.postId };
    }

    const post = await Post.find(query)
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
        .populate([
            {
                path: "user",
                select: ["avatar", "name"],
            },
        ]);

    const totalPost = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPost = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ post, totalPost, lastMonthPost });
});

export { createPost, updatePost, deletePost, getPost, getAllPost };
