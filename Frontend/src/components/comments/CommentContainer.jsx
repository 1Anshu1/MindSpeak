import { useState } from "react";
import { createComment } from "../../utils/axios/comment.api";

const CommentContainer = ({ postId, userId }) => {
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.length > 200) return;
        createComment({ content: comment, postId, userId })
            .then((res) => setComment(""))
            .catch((error) => alert(error));
    };

    return (
        <div className="">
            <p className=""></p>
            <form onSubmit={handleSubmit}>
                <div className="border-2 border-primaryBlue rounded-lg overflow-hidden my-5">
                    <textarea
                        name=""
                        id=""
                        rows="5"
                        value={comment}
                        maxLength={200}
                        placeholder="Leave Your Comment Here..."
                        className=" w-full p-2 border-none px-5 outline-none resize-none"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-between px-5">
                        <span className="self-start py-1 my-2 text-primaryBlue">
                            {200 - comment.length} characters remaining
                        </span>
                        <button
                            type="submit"
                            className="self-end bg-primaryBlue text-white px-5 rounded-lg py-1 my-2 mr-2"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default CommentContainer;
