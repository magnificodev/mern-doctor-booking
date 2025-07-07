import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
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
app.use(express.json()); // Middlewares for parsing application/json
app.use(express.urlencoded({ extended: true })); // Middlewares for parsing application/x-www-form-urlencoded

// Routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/", (req, res) => {
    res.send("API is up and running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



