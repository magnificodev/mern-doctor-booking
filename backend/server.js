import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Connect to Cloudinary
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/", (req, res) => {
    res.send("API is up and running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



