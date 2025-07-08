import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getUserAppointments, cancelAppointment } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
import { createOrder, capturePayment } from '../services/paypalService.js';

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.put("/update-profile", upload.single("image"), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, getUserAppointments);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

userRouter.post('/payments/create-paypal-order', authUser, async (req, res) => {
    try {
        const { amount, description } = req.body;
        const order = await createOrder(amount);
        res.json(order);
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        res.status(500).json({ message: "Failed to create PayPal order", error: error.message });
    }
});

userRouter.post('/payments/capture-paypal-order', authUser, async (req, res) => {
    try {
        const { orderId } = req.body;
        const captureData = await capturePayment(orderId);
        res.json(captureData);
    } catch (error) {
        console.error("Error capturing PayPal payment:", error);
        res.status(500).json({ message: "Failed to capture PayPal payment", error: error.message });
    }
});

export default userRouter;
