const ArticleDetailSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex-grow h-[400px] min-w-[800px] rounded-2xl my-5 bg-gray-300 "></div>
            <div className="w-40 h-5 bg-gray-300 rounded-lg"></div>

            <h1 className="bg-gray-300 rounded-lg h-5 w-80 my-5"></h1>
            <div className="h-[400px] w-[800px] bg-gray-300 rounded-lg"></div>
        </div>
    );
};
export default ArticleDetailSkeleton;
