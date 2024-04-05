import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updatePost } from "../../api/post.api";

const UpdateBlog = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [body, setBody] = useState(state.post.body);
    const [file, setFile] = useState();
    const [title, setTitle] = useState(state.post.title);
    const [caption, setCaption] = useState(state.post.caption);
    const [category, setCategory] = useState(state.post.category);
    const [previewSoucrce, setPreviewSource] = useState(state?.post?.photo?.secure_url);

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
        formData.append("body", body);
        formData.append("banner", file);

        try {
            const data = await updatePost(postId, formData);
            navigate(`/admin/manage`);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="min-h-[100vh] w-[80%] px-4 py-8 mx-auto sm:px-8 ">
            <h2 className="text-3xl text-darkBlue font-bold">Edit Blog</h2>
            <form className="flex flex-col gap-4 mt-5 w-full " onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row justify-between gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        className="flex-grow px-4 py-1 rounded-md outline-none"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <select
                        name=""
                        id=""
                        className="px-2 py-1 rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="uncategorized" className="">
                            Select a category
                        </option>
                        <option value="Technology" className="">
                            Technology
                        </option>
                        <option value="Coding" className="">
                            Coding
                        </option>
                        <option value="Design" className="">
                            Design
                        </option>
                        <option value="Fiction" className="">
                            Fiction
                        </option>
                    </select>
                </div>
                <div className="">
                    <input
                        type="text"
                        placeholder="Caption"
                        value={caption}
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
                    value={body}
                    onChange={(body) => setBody(body)}
                />
                <button type="submit" className="px-4 py-1 border-2 border-black rounded-md">
                    Update
                </button>
            </form>
        </div>
    );
};
export default UpdateBlog;
