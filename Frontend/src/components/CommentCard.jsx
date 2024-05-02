import { AiFillLike } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";

const CommentCard = ({ comment }) => {
    const handleLike = () => {};
    return (
        <div className="bg-bgGray p-5 rounded-2xl m-5">
            <div className="flex gap-5">
                <img
                    src={comment?.userId?.avatar.secure_url}
                    alt=""
                    className="rounded-full border-2 border-black w-10 h-10"
                />
                <div className="flex flex-col">
                    <div className="flex gap-2">
                        <p className="text-darkBlue font-bold">{comment?.userId.name}</p>
                        <p>{moment(comment.createdAt).fromNow()}</p>
                    </div>
                    <p className="text-sm">{comment?.content}</p>
                    <div className="flex gap-5 my-2">
                        {/* <span className="flex items-center gap-1 cursor-pointer">
                            <AiFillLike className="" onClick={handleLike} />
                            <p>{comment?.numOfLikes > 0 && comment?.numOfLikes} </p>
                        </span>
                        <span className="flex items-center gap-1 cursor-pointer">
                            <FaEdit className="" />
                            <p>Edit</p>
                        </span>
                        <span className="flex items-center gap-1 cursor-pointer">
                            <MdDeleteOutline className="" />
                            <p>Delete</p>
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CommentCard;
