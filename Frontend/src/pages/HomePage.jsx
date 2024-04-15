import { IoMdSearch } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import Layout from "../components/Layout";
import BannerImg from "../assets/banner-img.png";
import fb from "../assets/fb.png";
import ArticleCard from "../components/ArticleCard";
import { useEffect, useState } from "react";
import { getAllPost } from "../api/post.api";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        getAllPost()
            .then((res) => {
                setPosts(res.post);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("Fetching data from server might take approx 60 seconds");
            });
    }, []);

    return (
        <Layout>
            <div className="md:max-w-[90%] mx-auto p-5">
                <section className="flex flex-col-reverse md:flex-row md:items-center">
                    <div className="basis-[50%]">
                        <h1 className="text-center text-2xl text-darkBlue font-bold md:text-left md:text-6xl ">
                            Where Your Words Come to Life... and Occasionally Try to Escape!
                        </h1>
                        <p className="text-center text-darkBlue font-semibold md:text-left md:text-xl md:my-5">
                            Revolutionize your reading habits with our platform. Explore, engage, and expand your
                            horizons one captivating article at a time
                        </p>
                    </div>
                    <div className="">
                        <img src={BannerImg} alt="" className="h-full w-full" />
                    </div>
                </section>
                <section className="my-5">
                    {loading ? (
                        <div className="flex flex-wrap justify-center  gap-10">
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-10">
                            {posts && posts?.map((item) => <ArticleCard key={item._id} post={item} />)}
                        </div>
                    )}
                    <div className="w-fit my-10 mx-auto">
                        <Link
                            to="/articles"
                            className="flex items-center text-2xl font-semibold gap-2 text-primaryBlue bg-darkBlue rounded-lg border-2 border-primaryBlue px-2 py-2"
                        >
                            More articles
                            <FaArrowRightLong className="text-primaryBlue" />
                        </Link>
                    </div>
                </section>
            </div>
            <section className="">
                <svg
                    className="w-full h-auto max-h-40 translate-y-[1px]"
                    viewBox="0 0 2160 263"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        id="Wave"
                        d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
                        className="fill-dark"
                    />
                </svg>
                <div className="bg-dark px-5 sm:flex sm:flex-col lg:flex-row-reverse items-center justify-center">
                    <img src={fb} alt="" className="hidden sm:block" />
                    <div className="">
                        <h1 className="text-white text-2xl font-semibold mb-5">
                            Get our stories delivered From us to your inbox weekly.
                        </h1>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="rounded-lg px-5 py-2 outline-none w-full mb-2"
                        />
                        <button className="bg-primaryBlue text-dark px-5 py-2 rounded-lg mb-5 w-full">
                            Get started
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};
export default HomePage;
