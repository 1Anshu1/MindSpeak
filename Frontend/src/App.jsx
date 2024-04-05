import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import ArticleDetail from "./pages/ArticleDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Dashboard from "./components/admin/Dashboard";
import Comment from "./components/admin/Comment";
import ManageBlog from "./components/admin/ManageBlog";
import CreateBlog from "./components/admin/CreateBlog";
import UpdateBlog from "./components/admin/UpdateBlog";
import ManageUser from "./components/admin/ManageUser";
import ScrollToTop from "./components/ScrollToTop";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";
import Write from "./pages/Write";

const App = () => {
    return (
        <div className="bg-darkBlue bg-opacity-10">
            <BrowserRouter>
                <ScrollToTop />
                <ToastContainer
                    position="bottom-center"
                    autoClose={500}
                    limit={1}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition:Slide
                />
                <Routes>
                    <Route index path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/articles/:postId" element={<ArticleDetail />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<Admin />}>
                                <Route index element={<Dashboard />} />
                                <Route path="user" element={<ManageUser />} />
                                <Route path="comment" element={<Comment />} />
                                <Route path="manage" element={<ManageBlog />} />
                                <Route path="create" element={<CreateBlog />} />
                                <Route path="update/:postId" element={<UpdateBlog />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
export default App;
