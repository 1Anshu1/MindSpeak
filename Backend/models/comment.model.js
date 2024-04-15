import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: Types.ObjectId,
            ref: "Post",
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        numOfLikes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Comment = model("Comment", commentSchema);
export default Comment;
