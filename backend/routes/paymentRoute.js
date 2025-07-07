import express from "express"
import { createOrder, capturePayment, getOrderDetails } from "../controllers/paymentController.js";
import authUser from "../middlewares/authUser.js";


const paymentRouter = express.Router();

paymentRouter.post("/create-order", authUser, createOrder);
paymentRouter.post("/capture-payment", authUser, capturePayment);
paymentRouter.get("/get-order-details", authUser, getOrderDetails);

export default paymentRouter;