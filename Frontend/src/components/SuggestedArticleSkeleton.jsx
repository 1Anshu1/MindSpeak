const SuggestedArticleSkeleton = () => {
    return (
        <div>
            <div className="flex gap-5 mb-5 basis-[50%] cursor-pointer border-lightBlue border-2 rounded-lg animate-pulse">
                <div className="w-20 h-20 rounded-lg bg-gray-300" />
                <div className="">
                    <div className="m-2 h-5 w-40 rounded-lg bg-gray-300 ">{}</div>
                    <p className="m-2 h-5 w-28 rounded-lg bg-gray-300"></p>
                </div>
            </div>
        </div>
    );
};
export default SuggestedArticleSkeleton;
