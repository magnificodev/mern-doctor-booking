import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
dotenv.config();

// Get the directory name of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Connect to Cloudinary
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json()); // Middlewares for parsing application/json
app.use(express.urlencoded({ extended: true })); // Middlewares for parsing application/x-www-form-urlencoded
app.use("/", express.static(path.join(__dirname, "../frontend/dist")));
app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));


// Routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);
// app.use("*", (req, res) => res.sendFile(path.join(__dirname, "../frontend/dist/index.html")));
// app.use("/admin/*", (req, res) => res.sendFile(path.join(__dirname, "../admin/dist/index.html")));
app.use("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
app.use("/admin/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



