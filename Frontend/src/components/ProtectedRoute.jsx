import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const { user } = useSelector((state) => state.user);
    return user ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoute = () => {
    const { user } = useSelector((state) => state.user);
    return user.admin ? <Outlet /> : <Navigate to="/" />;
};
export { ProtectedRoute, AdminRoute };
