import Layout from "../components/Layout";

const NotFound = () => {
    return (
        <Layout>
            <div className="h-screen w-screen flex justify-center items-center bg-darkBlue">
                <div className=" text-center text-primaryBlue">
                    <p className="text-5xl my-5">Error 404 </p>
                    <p className="text-5xl my-5">Page Not Found</p>
                </div>
            </div>
        </Layout>
    );
};
export default NotFound;
