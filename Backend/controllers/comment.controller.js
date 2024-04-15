import asyncWrapper from "../middlewares/asyncWrapper.middleware.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import CustomError from "../utils/customError.js";

// create comment
const createComment = asyncWrapper(async (req, res, next) => {
    const { content, userId, postId } = req.body;

    if (userId !== req.user.id) {
        throw next(new CustomError(400, "You cannot comment"));
    }
    const post = await Post.findOne({ _id: postId });
    if (!post) {
        throw next(new CustomError(400, "Post does not exist"));
    }

    const comment = new Comment({
        userId: req.user.id,
        content,
        postId: postId,
    });
    await comment.save();
    res.status(200).json({ message: "Comment created" });
});

// get post comments
const getPostComments = asyncWrapper(async (req, res, next) => {
    const { postId } = req.params;

    const comments = await Comment.find({ postId }).sort({ updatedAt: -1 });
    res.status(200).json({ comments });
});

// updateComment
const updateComment = asyncWrapper(async (req, res, next) => {});

// deleteComment
const deleteComment = asyncWrapper(async (req, res, next) => {});

const likeComment = asyncWrapper(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
        return next(new CustomError(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
        comment.likes.push(req.user.id);
        comment.numOfLikes += 1;
    } else {
        comment.likes.splice(userIndex, 1);
        comment.numOfLikes -= 1;
    }

    await comment.save();
    res.status(200).json(comment);
});

export { createComment, getPostComments, updateComment, deleteComment };
