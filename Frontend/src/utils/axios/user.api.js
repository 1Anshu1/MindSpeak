import axios from "axios";

const getAllUser = async () => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/user`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

export { getAllUser };
