import axios from "axios";

const getAllPost = async (url = "", startIndex = 0) => {
    url = url.length > 0 ? `${url}&startIndex=${startIndex}` : `?startIndex=${startIndex}`;
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/post${url}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

const getPost = async (postId) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/post/${postId}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

const createPost = async (payload) => {
    const token = JSON.parse(localStorage.getItem("blog-token"));
    try {
        const { data } = await axios.post(`http://localhost:8000/api/v1/post/`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

const updatePost = async (postId, payload) => {
    const token = JSON.parse(localStorage.getItem("blog-token"));
    try {
        const { data } = await axios.patch(`http://localhost:8000/api/v1/post/${postId}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

const deletePost = async (postId) => {
    const token = JSON.parse(localStorage.getItem("blog-token"));
    try {
        const { data } = await axios.delete(`http://localhost:8000/api/v1/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

export { getAllPost, getPost, createPost, deletePost, updatePost };
