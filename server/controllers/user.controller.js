import asyncWrapper from "../middlewares/asyncWrapper.middleware.js";
import User from "../models/user.model.js";
import CustomError from "../utils/customError.js";
import cloudinary from "../utils/cloudinary.util.js";
import { removeFile } from "../utils/fileRemover.util.js";

// get all user details
const getAllUser = asyncWrapper(async (req, res, next) => {
    const user = await User.find().select("-password");
    if (!user) {
        throw next(new CustomError(400, "user does not exist"));
    }
    res.status(200).json({ user });
});

// get user details
const getUser = asyncWrapper(async (req, res, next) => {
    const user_id = req.user.id;

    const user = await User.findOne({ _id: user_id });
    if (!user) {
        throw next(new CustomError(400, "user does not exist"));
    }
    user.password = undefined;
    res.status(200).json({ user });
});

// update user
const updateUser = asyncWrapper(async (req, res, next) => {
    const user_id = req.user.id;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
        throw next(new CustomError(400, "user does not exist"));
    }
    user.email = req.body.email;
    if (user.password) {
        user.password = req.body.password;
    }
    if (req.file && req.file.path) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "blog",
        });
        // await cloudinary.uploader.destroy(user?.avatar?.public_id);
        user.avatar = { public_id, secure_url };
    }
    await user.save();
    if (req.file && req.file.path) {
        removeFile(req.file.path);
    }
    user.password = undefined;
    res.status(200).json({ user });
});

// upadte profile picture
const updateProfileImg = asyncWrapper(async (req, res, next) => {
    if (!req.file || !req.file.path) {
        throw next(new CustomError(400, "profile image must be provided"));
    }
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "blog",
    });
    const user = await User.findOne({ _id: req.user.id });
    user.avatar = { public_id, secure_url };
    await user.save();
    removeFile(req.file.path);
    res.status(200).json({ message: "profile picture updated" });
});

// delete user

export { getAllUser, getUser, updateUser, updateProfileImg };
