import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/post.api";

const CreateBlog = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState();
    const [file, setFile] = useState();
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [category, setCategory] = useState("");
    const [previewSoucrce, setPreviewSource] = useState("");

    const handleFileChange = (e) => {
        const image = e.target.files[0];
        setFile(image);

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => setPreviewSource(reader.result);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("caption", caption);
        formData.append("category", category);
        formData.append("body", value);
        formData.append("banner", file);

        try {
            const data = await createPost(formData);
            navigate(`/admin/manage`);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="min-h-[100vh] w-[80%] px-4 py-8 mx-auto sm:px-8 bg-gray-600">
            <h2 className="text-3xl text-darkBlue font-bold">Create Blog</h2>
            <form className="flex flex-col gap-4 mt-5 w-full " onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row justify-between gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        className="flex-grow px-4 py-1 rounded-md outline-none"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <select
                        name=""
                        id=""
                        className="px-2 py-1 rounded-md"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a Category</option>
                        <option value="technology">Technology</option>
                        <option value="programming">Programming</option>
                        <option value="ai">Artificial Intelligence</option>
                        <option value="datascience">Data Science</option>
                        <option value="development">Development</option>
                    </select>
                </div>
                <div className="">
                    <input
                        type="text"
                        placeholder="Caption"
                        className="w-full px-4 py-1 rounded-md outline-none"
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>
                <div className="flex justify-between p-2 border-2 border-dotted border-primaryBlue">
                    <input
                        type="file"
                        accept="image/*"
                        name="banner"
                        className="border-2 rounded-md"
                        onChange={handleFileChange}
                    />
                </div>
                <img src={previewSoucrce} alt="" className="h-80" />
                <ReactQuill
                    theme="snow"
                    placeholder="Write Something...."
                    className="h-72 mb-10"
                    required
                    onChange={(value) => setValue(value)}
                />
                <button type="submit" className="px-4 py-1 border-2 border-black rounded-md">
                    Publish
                </button>
            </form>
        </div>
    );
};
export default CreateBlog;
