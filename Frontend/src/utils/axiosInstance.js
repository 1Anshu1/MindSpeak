import axios from "axios";
import { BASE_URL } from "../constants/constants";

const getUserDetails = async () => {
    const token = JSON.parse(localStorage.getItem("blog-token"));
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export default getUserDetails;
