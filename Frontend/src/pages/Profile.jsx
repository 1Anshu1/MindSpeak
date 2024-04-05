import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultProfileImg from "../assets/defaultProfileImg.jpeg";

import Layout from "../components/Layout";
import { updateAction } from "../redux/features/userSlice";

const Profile = () => {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        avatar: "",
        name: userState?.user?.name,
        email: userState?.user?.email,
        password: "",
    });
    const [previewSoucrce, setPreviewSource] = useState(userState.user?.avatar?.secure_url);

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleImg = (e) => {
        const image = e.target.files[0];
        setUserInfo({ ...userInfo, avatar: image });

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => setPreviewSource(reader.result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", userInfo.name);
        formData.append("email", userInfo.email);
        formData.append("password", userInfo.password);
        formData.append("avatar", userInfo.avatar);
        dispatch(updateAction(formData));
    };

    const handleDelete = () => {
        console.log("ajsdhj");
    };

    return (
        <Layout>
            <h1 className="text-4xl font-bold text-darkBlue text-center my-5">My Profile </h1>
            <form className="flex flex-col max-w-[600px] mx-auto gap-5 px-10 py-5" onSubmit={handleSubmit}>
                <label htmlFor="avatar" className="self-center">
                    <img
                        src={previewSoucrce}
                        alt=""
                        name="avatar"
                        className="w-40 h-40 rounded-full border-2 object-cover object-center"
                    />
                </label>
                <input
                    type="file"
                    accept="image/*"
                    id="avatar"
                    name="avatar"
                    className="sr-only"
                    onChange={handleImg}
                />
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={userInfo.name}
                    readOnly
                    className="border-2 border-gray-400 placeholder-black rounded-md px-2 py-2 outline-none cursor-not-allowed"
                />
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
                <button className=" bg-primaryBlue rounded-md text-white py-2 px-3">Update</button>
            </form>
            <div className="text-red-500 my-5 mx-auto w-fit cursor-pointer font-semibold" onClick={handleDelete}>
                Delete Account
            </div>
        </Layout>
    );
};
export default Profile;
