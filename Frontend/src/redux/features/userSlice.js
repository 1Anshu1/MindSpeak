import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/constants";
import { toast } from "react-toastify";

// register
export const registerAction = createAsyncThunk("user/register", async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/register`, payload);

        localStorage.setItem("blog-user", JSON.stringify(data.user));
        return data.user;
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
            throw error;
        }
        toast.error(error.response.data.message);
        return rejectWithValue(error);
    }
});

// login
export const loginAction = createAsyncThunk("user/login", async (payload, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/login`, payload);
        localStorage.setItem("blog-user", JSON.stringify(data.existingUser));
        localStorage.setItem("blog-token", JSON.stringify(data.token));
        return data.existingUser;
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
            throw error;
        }
        toast.error(error.response.data.message);
        return rejectWithValue(error);
    }
});

// update
export const updateAction = createAsyncThunk("user/update", async (payload, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem("blog-token"));
    try {
        const { data } = await axios.patch(`${BASE_URL}/api/v1/user`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.setItem("blog-user", JSON.stringify(data.user));
        toast.success("profile updated");
        return data.user;
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
            throw error;
        }
        toast.error(error.response.data.message);
        return rejectWithValue(error);
    }
});

let userFromLocalStorage = localStorage.getItem("blog-user") ? JSON.parse(localStorage.getItem("blog-user")) : null;

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: userFromLocalStorage,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("blog-user");
            localStorage.removeItem("blog-token");
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        // register
        builder.addCase(registerAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(registerAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message;
        });
        // login
        builder.addCase(loginAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message;
        });
        // update
        builder.addCase(updateAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(updateAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.response.data.message;
        });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
