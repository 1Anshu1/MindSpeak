import express from "express";

import { createPost, deletePost, getPost, updatePost, getAllPost } from "../controllers/post.controller.js";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, uploadImage.single("banner"), createPost).get(getAllPost);
router
    .route("/:postId")
    .patch(authMiddleware, authorize, uploadImage.single("banner"), updatePost)
    .delete(authMiddleware, authorize, deletePost)
    .get(getPost);

export default router;
