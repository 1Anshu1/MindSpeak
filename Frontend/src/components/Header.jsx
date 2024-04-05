import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { logout } from "../redux/features/userSlice";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();

    const handleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className="flex justify-between mb-5 md:max-w-[90%] mx-auto p-5">
            <Link to="/" className="text-darkBlue text-3xl font-extrabold">
                MindSpeak
            </Link>
            {/* Desktop view */}
            <div className="hidden md:flex md:justify-between md:items-center md:gap-10">
                <ul className="flex justify-between gap-10 font-semibold">
                    <li className={`${location.pathname === "/" ? "text-blue-500" : ""}`}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={`${location.pathname === "/articles" ? "text-blue-500" : ""}`}>
                        <Link to="/articles">Articles</Link>
                    </li>
                    <li
                        className={`${location.pathname === "/profile" ? "text-blue-500" : ""}${
                            !userState.user ? "hidden" : ""
                        }`}
                    >
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li
                        className={`${location.pathname === "/write" ? "text-blue-500" : ""}${
                            !userState.user ? "hidden" : ""
                        }`}
                    >
                        <Link to="/write">Write</Link>
                    </li>
                    <li
                        className={`${location.pathname === "/admin" ? "text-blue-500" : ""}${
                            !userState.user?.admin === true ? "hidden" : ""
                        }`}
                    >
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>
                {userState.user ? (
                    <button
                        className="text-primaryBlue border-2 border-primaryBlue rounded-3xl px-5 py-1 hover:bg-primaryBlue hover:text-white"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="text-primaryBlue border-2 border-primaryBlue rounded-3xl px-5 py-1 hover:bg-primaryBlue hover:text-white"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                )}
            </div>

            {/* mobile view */}
            <div className="md:hidden">
                {!openMenu ? (
                    <GiHamburgerMenu className="md:hidden cursor-pointer text-4xl text-darkBlue" onClick={handleMenu} />
                ) : (
                    <IoMdClose className="md:hidden cursor-pointer text-2xl" onClick={handleMenu} />
                )}
                <div
                    className={` ${
                        openMenu ? "left-0 right-0" : "hidden"
                    } md:hidden mt-5 absolute h-[90vh] z-10 bg-dark text-white`}
                >
                    <ul className="flex flex-col items-center justify-center gap-10 font-semibold h-full">
                        <li className={`${location.pathname === "/" ? "text-blue-500" : ""}`}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={`${location.pathname === "/articles" ? "text-blue-500" : ""}`}>
                            <Link to="/articles">Articles</Link>
                        </li>
                        <li
                            className={`${location.pathname === "/profile" ? "text-blue-500" : ""}${
                                !userState.user ? "hidden" : ""
                            }`}
                        >
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li
                            className={`${location.pathname === "/admin" ? "text-blue-500" : ""}${
                                !userState.user?.admin === true ? "hidden" : ""
                            }`}
                        >
                            <Link to="/admin">Admin</Link>
                        </li>
                        {userState.user ? (
                            <button
                                className="text-primaryBlue bg-white border-2 border-primaryBlue rounded-3xl px-5 py-1 hover:bg-primaryBlue hover:text-white"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                className="text-primaryBlue bg-white border-2 border-primaryBlue rounded-3xl px-5 py-1 hover:bg-primaryBlue hover:text-white"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};
export default Header;
