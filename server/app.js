import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from 'path';

const __dirname = path.resolve();

import { errorMiddleware, notFound } from "./middlewares/error.middleware.js";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/comment", commentRoute);

app.use(express.static(path.join(__dirname, '/Frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
});

app.use(notFound);
app.use(errorMiddleware);

export default app;
