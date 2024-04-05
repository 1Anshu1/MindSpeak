import express from "express";

import { getUser, updateUser, updateProfileImg, getAllUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
    .route("/")
    .get(getAllUser)
    .get(authMiddleware, getUser)
    .patch(authMiddleware, uploadImage.single("avatar"), updateUser);
router.route("/updateProfilePicture").post(authMiddleware, uploadImage.single("avatar"), updateProfileImg);

export default router;
