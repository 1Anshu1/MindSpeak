import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/api/v1${url}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                setError(error.response ? error.response.data.message : error.message);
            })
            .finally(setLoading(false));
    }, [url]);

    return { loading, data, error };
};

export { useFetch };
