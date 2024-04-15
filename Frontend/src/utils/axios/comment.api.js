import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const getPostComments = async (postId) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/comment/${postId}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

const createComment = async (payload) => {
    const token = JSON.parse(localStorage.getItem("blog-token"));
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/comment/`, payload, {
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

const updatePost = async (slug, payload) => {
    const token = JSON.parse(localStorage.getItem("blog-token"));
    try {
        const { data } = await axios.patch(`${BASE_URL}/api/v1/post/${slug}`, payload, {
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

const deletePost = async (slug) => {
    const token = JSON.parse(localStorage.getItem("blog-token"));
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/post/${slug}`, {
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

export { getPostComments, createComment, deletePost, updatePost };
