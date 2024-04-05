import moment from "moment";
import { Link } from "react-router-dom";

const ArticleCard = ({ post }) => {
    return (
        <div className="sm:w-[calc(50%-20px)] lg:w-[calc(33%-40px)] rounded-lg shadow-lg overflow-hidden">
            <Link to={`/articles/${post._id}`}>
                <img src={post?.photo?.secure_url} alt="" className="w-full h-[300px] object-cover object-center" />
            </Link>
            <div className="p-2">
                <Link to={`/articles/${post._id}`}>
                    <h1 className="text-darkBlue text-2xl font-bold">{post?.title}</h1>
                    <p className="text-dark">{post?.caption}</p>
                </Link>
                <div className="flex gap-2 italic justify-between items-center mt-5 ">
                    <div className="flex gap-5">
                        <img src={post?.user?.avatar?.secure_url} alt="" className="rounded-full w-10 h-10" />
                        <div className="flex flex-col">
                            <p className="text-darkBlue font-bold">{post?.user.name}</p>
                            <div className="text-textGray font-bold">{moment(post?.updatedAt).fromNow()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ArticleCard;
