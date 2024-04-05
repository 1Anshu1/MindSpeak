import { useNavigate } from "react-router-dom";
import articleSmallImg from "../assets/articleSmallImg.png";

const SuggestedArticle = ({ post }) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex gap-5 mb-5 basis-[50%] cursor-pointer border-lightBlue border-2 rounded-lg"
            onClick={() => navigate(`/articles/${post?._id}`)}
        >
            <img src={post?.photo?.secure_url} alt="" className="w-20 h-20 rounded-lg" />
            <div className="">
                <h1 className="text-xl font-semibold mb-2">{post?.title}</h1>
                <p className="text-black opacity-70">{new Date(post?.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};
export default SuggestedArticle;
