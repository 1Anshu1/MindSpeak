import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
    {
        photo: {
            _id: false,
            type: {
                public_id: String,
                secure_url: String,
            },
            default: "",
        },
        title: {
            type: String,
            required: [true, "title is required"],
            unique: true,
        },
        caption: {
            type: String,
            required: [true, "caption is required"],
            unique: true,
        },
        body: {
            type: String,
            required: [true, "body is required"],
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        tags: {
            type: [String],
        },
        category: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId",
});

const Post = model("Post", postSchema);
export default Post;
