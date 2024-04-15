import dotenv from "dotenv/config";


import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Error in connecting to database`, error);
        process.exit(1);
    });
