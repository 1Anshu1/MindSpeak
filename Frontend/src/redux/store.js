import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
