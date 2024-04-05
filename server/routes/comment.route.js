import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createComment, getPostComments, updateComment, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.route("/").post(authMiddleware, createComment);
router.route("/:postId").get(getPostComments);
router.route("/:id").patch(authMiddleware, updateComment).delete(authMiddleware, deleteComment);

export default router;
