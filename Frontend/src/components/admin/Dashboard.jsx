const Dashboard = () => {
    return (
        <div className="p-5 w-full">
            <h1 className="text-3xl text-darkBlue font-bold">Dashboard</h1>
            <div className="flex gap-5 justify-between my-5">
                <div className="border-2 border-primaryBlue rounded-lg p-2 bg-darkBlue text-primaryBlue">
                    <p className="text-2xl ">Total Users</p>
                    <p className="text-3xl font-semibold">{12}</p>
                </div>
                <div className="border-2 border-primaryBlue rounded-lg p-2 bg-darkBlue text-primaryBlue">
                    <p className="text-2xl ">Total Posts</p>
                    <p className="text-3xl font-semibold">{12}</p>
                </div>
                <div className="border-2 border-primaryBlue rounded-lg p-2 bg-darkBlue text-primaryBlue">
                    <p className="text-2xl ">Total Comments</p>
                    <p className="text-3xl font-semibold">{12}</p>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
