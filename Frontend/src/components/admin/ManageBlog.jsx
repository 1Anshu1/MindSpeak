import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost, getAllPost } from "../../api/post.api";

const ManageBlog = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);

    const handleShowMore = async () => {
        const startIndex = posts.length;
        setLoading(true);
        getAllPost(`?startIndex=${startIndex}`)
            .then((res) => {
                setPosts((prev) => [...prev, ...res.post]);
                setLoading(false);
                if (res.post.length < 9) {
                    setShowMore(false);
                }
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    };

    const handleDelete = (slug) => {
        deletePost(slug)
            .then((res) => {
                setPosts((prev) => prev.filter((post) => post._id !== res.post._id));
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    };

    useEffect(() => {
        setLoading(true);
        getAllPost()
            .then((res) => {
                setPosts(res.post);
                setLoading(false);
                if (res.post.length < 9) {
                    setShowMore(false);
                }
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    }, []);

    return (
        <div className="h-[100vh] w-[80%] px-4 py-8 mx-auto sm:px-8">
            <h2 className="text-3xl text-darkBlue font-bold">Manage Blog</h2>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="rounded-full border-8 border-darkBlue border-b-primaryBlue h-20 w-20 animate-spin "></div>
                </div>
            ) : (
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="bg-white px-5 py-3 text-sm text-left text-gray-800 uppercase border-b border-gray-200"
                                    >
                                        DATE UPDATED
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm  text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        POST IMAGE
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        POST TITLE
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm  text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        CATEGORY
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        DELETE
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        EDIT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post._id}>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {new Date(post?.updatedAt).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <img
                                                alt=""
                                                src={post?.photo?.secure_url}
                                                className="object-cover h-16 w-20 rounded-md "
                                            />
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">{post?.title}</p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">{post?.category}</p>
                                        </td>
                                        <td
                                            className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-red-500 cursor-pointer"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            Delete
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <span
                                                className="text-green-500 cursor-pointer"
                                                onClick={() =>
                                                    navigate(`/admin/update/${post._id}`, { state: { post } })
                                                }
                                            >
                                                Edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {showMore && (
                        <button
                            className="px-5 py-2 rounded-md bg-primaryBlue text-white w-full"
                            onClick={handleShowMore}
                        >
                            Show More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
export default ManageBlog;
