import User from "../models/user.model.js";
import asyncWrapper from "../middlewares/asyncWrapper.middleware.js";
import CustomError from "../utils/customError.js";
import { createToken } from "../utils/jwt.util.js";

// register
const register = asyncWrapper(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw next(new CustomError(400, "required field missing"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw next(new CustomError(400, "user already exist"));
    }

    const user = await User.create({ name, email, password });
    user.password = undefined;
    const token = createToken({ id: user._id, admin: user.admin });
    res.status(200).json({ message: "user registerd successfully", user, token });
});

// login
const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw next(new CustomError(400, "invalid credentials"));
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw next(new CustomError(400, "invalid credentials"));
    }
    const verifyPassword = await existingUser.comparePassword(password);
    if (!verifyPassword) {
        throw next(new CustomError(400, "invalid credentials"));
    }

    existingUser.password = undefined;
    const token = createToken({ id: existingUser._id, admin: existingUser.admin });
    res.status(200).json({ message: "login successful", existingUser, token });
});

export { register, login };
