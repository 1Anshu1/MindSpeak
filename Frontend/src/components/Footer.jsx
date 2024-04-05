const Footer = () => {
    return (
        <div className="bg-dark text-white px-5 py-10 ">
            <div className="text-center py-5 ">
                <div className=" text-3xl font-extrabold ">MindSpeak</div>
                <p className="opacity-30">
                    Revolutionize your reading habits with our platform. Explore, engage, and expand your horizons one
                    captivating article at a time
                </p>
            </div>
            <div className="text-center">&#169; {new Date(Date.now()).getFullYear()} All Rights Reserved</div>
        </div>
    );
};
export default Footer;
