import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginAction } from "../redux/features/userSlice";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

const Login = () => {
    const userState = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAction(userInfo));
    };

    useEffect(() => {
        if (userState.user) {
            navigate("/");
        }
    }, [navigate, userState.user]);

    return (
        <Layout>
            <div className="flex justify-center md:max-w-[600px] my-10 mx-auto">
                <div className="basis-[60%] ">
                    <h1 className="text-4xl font-bold text-darkBlue text-center my-5">Login </h1>
                    <form action="" className="flex flex-col gap-5 my-3" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            className="border-2 border-gray-400 placeholder-black rounded-md px-2 py-2 outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                            className="border-2 border-gray-400 placeholder-black rounded-md px-2 py-2 outline-none"
                        />
                        <div className="text-primaryBlue font-semibold">
                            <Link to="/forget-password">Forgot Password?</Link>
                        </div>
                        <button className=" bg-primaryBlue rounded-md text-white py-2 px-3">Login</button>
                    </form>
                    <p className="">
                        Create new account?
                        <Link to="/register" className="underline text-primaryBlue font-semibold">
                            register
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};
export default Login;
