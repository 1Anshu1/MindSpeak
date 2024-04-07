import axios from "axios";

const getAllUser = async () => {
    try {
        const { data } = await axios.get(`https://mindspeak.onrender.com/api/v1/user`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

export { getAllUser };
