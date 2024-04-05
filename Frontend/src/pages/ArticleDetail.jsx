import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { FaSquareXTwitter, FaSquareWhatsapp, FaSquareReddit } from "react-icons/fa6";

import Layout from "../components/Layout";
import CommentCard from "../components/CommentCard";
import Breadcrumb from "../components/Breadcrumb";
import SuggestedArticle from "../components/SuggestedArticle";
import CommentContainer from "../components/comments/CommentContainer";
import { getAllPost, getPost } from "../api/post.api";
import { getPostComments } from "../utils/axios/comment.api";
import SuggestedArticleSkeleton from "../components/SuggestedArticleSkeleton";
import ArticleDetailSkeleton from "./ArticleDetailSkeleton";

const url = encodeURI("http://google.com");
const title = encodeURIComponent("Google");

const ArticleDetail = () => {
    const { postId } = useParams();
    const { user } = useSelector((state) => state.user);

    const [breadCrumbData, setBreadCrumbData] = useState([]);
    const [body, setBody] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingComment, setLoadingComment] = useState(false);
    const [loadingSuggested, setLoadingSuggested] = useState(false);
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [suggestedPost, setSuggestedPost] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPost(postId)
            .then((res) => {
                setPost(res.post);
                setLoading(false);
                setBreadCrumbData([
                    { name: "Home", link: "/" },
                    { name: "Articles", link: "/articles" },
                    { name: "Article Title", link: `/articles/${res.post._id}` },
                ]);
                setBody(parse(res.post.body));
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    }, [postId]);

    useEffect(() => {
        getPostComments(postId)
            .then((res) => {
                setComments(res.post);
            })
            .catch((error) => {
                alert(error);
            });
    }, [postId]);

    useEffect(() => {
        setLoadingSuggested(true);
        getAllPost()
            .then((res) => {
                setSuggestedPost(res.post);
                setLoadingSuggested(false);
            })
            .catch((error) => {
                alert(error);
            });
    }, []);

    return (
        <Layout>
            <div className="lg:flex lg:gap-5 md:max-w-[90%] mx-auto p-5">
                {loading ? (
                    <ArticleDetailSkeleton />
                ) : (
                    <div className="px-5 basis-[70%]">
                        <Breadcrumb data={breadCrumbData} />
                        <div className="flex-grow h-[400px] overflow-hidden rounded-2xl border-black border-2 my-5">
                            <img src={post?.photo?.secure_url} alt="" className="w-full h-full object-center" />
                        </div>
                        <div className="flex gap-5 text-primaryBlue mb-5 text-xl font-semibold">
                            <Link to={`/blog?category=${post?.category}`} className=" tracking-widest  ">
                                {post?.category}
                            </Link>
                        </div>

                        <h1 className="text-3xl font-bold mb-5">{post?.title}</h1>
                        <div className="">{body}</div>

                        {/* Comments Section */}
                        {user ? (
                            <CommentContainer userId={user._id} postId={post._id} />
                        ) : (
                            <p className="text-primaryBlue mt-10">You must be logged in to comment</p>
                        )}
                        <h2 className="font-bold text-2xl">
                            {comments?.length > 0 ? `All Comments (${post.comments.length})` : "No Comments Yet"}
                        </h2>
                        <div className="">
                            {post?.comments?.map((comment) => (
                                <CommentCard key={comment._id} comment={comment} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="shadow-2xl px-5 rounded-lg lg:mx-5 lg:h-fit py-2">
                    {/* Suggested Article */}
                    <h2 className="font-bold text-2xl my-5">Latest Article</h2>
                    <div className="sm:flex sm:flex-wrap lg:flex-nowrap lg:flex-col ">
                        {loadingSuggested ? (
                            <div className="">
                                <SuggestedArticleSkeleton />
                                <SuggestedArticleSkeleton />
                                <SuggestedArticleSkeleton />
                                <SuggestedArticleSkeleton />
                                <SuggestedArticleSkeleton />
                            </div>
                        ) : (
                            suggestedPost?.map((item, idx) => {
                                if (idx < 6 && item._id !== postId) {
                                    return <SuggestedArticle key={item._id} post={item} />;
                                }
                            })
                        )}
                    </div>

                    {/* Social Link */}
                    <h2 className="font-bold text-2xl my-5">Share</h2>
                    <div className="flex gap-2">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                        >
                            <FaSquareXTwitter className="text-4xl" />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`http://www.reddit.com/submit?url=${window.location.href}&title=${title}`}
                        >
                            <FaSquareReddit className="text-4xl text-[#FF5700]" />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://api.whatsapp.com/send/?text=${window.location.href}`}
                        >
                            <FaSquareWhatsapp className="text-4xl text-[#25D366]" />
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default ArticleDetail;
