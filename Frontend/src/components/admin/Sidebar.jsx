import { AiFillDashboard } from "react-icons/ai";
import { FaComments, FaUsers } from "react-icons/fa";
import { MdPostAdd, MdDashboardCustomize } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <div className="h-[100vh] w-[20%] bg-white p-5">
            <div className="text-darkBlue text-3xl font-extrabold">
                <Link to="/">MindSpeak</Link>
            </div>
            <div className="mt-5 pl-5 font-semibold space-y-5">
                <div className={`flex items-center gap-2  ${pathname.endsWith("admin") && "text-primaryBlue"}`}>
                    <AiFillDashboard />
                    <Link to="">Dashboard</Link>
                </div>
                <div
                    id="users"
                    className={`flex items-center gap-2  ${pathname.endsWith("user") && "text-primaryBlue"}`}
                >
                    <FaUsers />
                    <Link to="user"> Users</Link>
                </div>
                {/* <div
                    id="comments"
                    className={`flex items-center gap-2  ${pathname.endsWith("comment") && "text-primaryBlue"}`}
                >
                    <FaComments />
                    <Link to="comment">Comments</Link>
                </div> */}
                <div
                    id="blogs"
                    className={`flex items-center gap-2  ${pathname.endsWith("manage") && "text-primaryBlue"}`}
                >
                    <MdPostAdd />
                    <Link to="manage"> Manage Blog</Link>
                </div>
                <div
                    id="create"
                    className={`flex items-center gap-2  ${pathname.endsWith("create") && "text-primaryBlue"}`}
                >
                    <MdDashboardCustomize />
                    <Link to="create"> Create Blog</Link>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
