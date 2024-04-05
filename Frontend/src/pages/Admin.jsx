import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
    return (
        <div className="flex bg-gray-100 w-[100vw]">
            <Sidebar />
            <Outlet />
        </div>
    );
};
export default Admin;
