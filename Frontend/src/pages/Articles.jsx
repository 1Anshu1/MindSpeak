import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import Breadcrumb from "../components/Breadcrumb";
import { getAllPost } from "../api/post.api";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";

const Articles = () => {
    const location = useLocation();
    const [breadCrumbData, setBreadCrumbData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [startIndex, setStartIndex] = useState(0);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            const urlParams = new URLSearchParams(searchParams);
            if (search.length === 0) {
                // const urlParams = new URLSearchParams(searchParams);
                urlParams.delete("search");
                setSearchParams(urlParams.toString());
            } else {
                urlParams.set("search", search);
                setSearchParams(urlParams.toString());
            }
        }
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
        const urlParams = new URLSearchParams(searchParams);
        if (e.target.value.length === 0) {
            // const urlParams = new URLSearchParams(searchParams);
            urlParams.delete("category");
            setSearchParams(urlParams.toString());
        } else {
            urlParams.set("category", e.target.value);
            setSearchParams(urlParams.toString());
            console.log(location.search);
        }
    };

    const handleSort = (e) => {
        setSort(e.target.value);
        const urlParams = new URLSearchParams(searchParams);
        urlParams.set("sort", e.target.value);
        setSearchParams(urlParams.toString());
    };

    const handleShowMore = () => {
        setStartIndex(posts.length);
        getAllPost(location.search, posts.length)
            .then((res) => {
                setPosts([...posts, ...res.post]);
            })
            .catch((error) => {
                alert(error);
            });
    };

    // persisting filter criteria
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchQuery = urlParams.get("search");
        const categoryQuery = urlParams.get("category");
        const sortQuery = urlParams.get("sort");

        if (urlParams.get("search")) {
            setSearch(searchQuery);
        }
        if (urlParams.get("category")) {
            setCategory(categoryQuery);
        }
        if (urlParams.get("sort")) {
            setSort(sortQuery);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        getAllPost(location.search)
            .then((res) => {
                setPosts(res.post);
                setLoading(false);
                setBreadCrumbData([
                    { name: "Home", link: "/" },
                    { name: "Articles", link: "/articles" },
                ]);
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    }, [location.search]);

    return (
        <Layout>
            <div className="bg-bgShade md:max-w-[90%] mx-auto p-5">
                <Breadcrumb data={breadCrumbData} />
                <section className="md:flex md:items-center md:justify-between">
                    <div className="basis-[50%]">
                        <div className="bg-white flex justify-between items-center p-2 gap-2 rounded-lg border-2 border-primaryBlue">
                            <input
                                type="text"
                                placeholder="Search article"
                                className="w-[90%] outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyUp={handleSearch}
                            />
                            <IoMdSearch onClick={() => console.log("search-buuton")} />
                        </div>
                    </div>
                    <div className="sm:flex gap-2">
                        <label htmlFor="category" className="p-2">
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="border-2 border-gray-400 "
                            value={category}
                            onChange={handleCategory}
                        >
                            <option value="">Select a Category</option>
                            <option value="technology">Technology</option>
                            <option value="programming">Programming</option>
                            <option value="ai">Artificial Intelligence</option>
                            <option value="datascience">Data Science</option>
                            <option value="development">Development</option>
                        </select>
                    </div>
                    <div className="my-5 sm:flex gap-2">
                        <label htmlFor="sort" className="p-2">
                            Sort:{" "}
                        </label>
                        <select
                            name="sort"
                            id="sort"
                            value={sort}
                            className="border-2 border-gray-400"
                            onChange={handleSort}
                        >
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </section>
                <section className="">
                    {!loading && (
                        <div className="font-semibold my-5 text-xl text-darkBlue">{posts.length} posts found</div>
                    )}
                    {loading ? (
                        <div className="flex flex-wrap gap-10">
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                        </div>
                    ) : (
                        <div className="flex justify-start flex-wrap gap-10">
                            {posts && posts?.map((item) => <ArticleCard key={item._id} post={item} />)}
                        </div>
                    )}
                    <div className={`w-full my-10 ${startIndex >= posts.length && "hidden"}`}>
                        <button
                            className="flex items-center text-2xl font-semibold gap-2 text-primaryBlue rounded-lg border-2 border-primaryBlue px-2 mx-auto"
                            onClick={handleShowMore}
                        >
                            More articles
                            <FaArrowRightLong className="text-primaryBlue" />
                        </button>
                    </div>
                </section>
            </div>
        </Layout>
    );
};
export default Articles;
