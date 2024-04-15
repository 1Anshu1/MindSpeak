import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const getAllUser = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/user`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message;
        }
        throw error.message;
    }
};

export { getAllUser };
