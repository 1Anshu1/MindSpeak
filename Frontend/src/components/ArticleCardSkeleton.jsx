const ArticleCardSkeleton = () => {
    return (
        <div className="sm:w-[calc(50%-20px)] lg:w-[calc(33%-40px)] rounded-lg shadow-lg animate-pulse">
            {/* image */}
            <div className="w-full min-w-[200px] h-[200px] bg-slate-300" />

            <div className="p-2">
                {/* title */}
                <h1 className="bg-slate-300 w-full rounded-lg h-2 my-2"></h1>
                {/* caption */}
                <p className="bg-slate-300 w-full rounded-lg h-2"></p>

                <div className="flex gap-2 italic justify-between items-center mt-5 ">
                    <div className="flex gap-5 h-auto">
                        {/* profile image */}
                        <div className="rounded-full w-10 h-10 bg-slate-300" />
                        <div className="flex flex-col h-10 w-10">
                            <div className="bg-slate-300 h-2 w-full rounded-lg" />
                            <div className="flex items-center gap-2">
                                <p className="bg-slate-300 h-2 w-full my-2 rounded-lg"></p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-300 h-2 w-10 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};
export default ArticleCardSkeleton;
