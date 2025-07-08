import { Router } from "express";
import { createUserOrder, captureUserPayment, getUserOrderDetails } from "../controllers/paymentController.js";
import authUser from "../middlewares/authUser.js";

const paymentRouter = Router();

paymentRouter.post("/create-order", authUser, createUserOrder);
paymentRouter.post("/capture-payment", authUser, captureUserPayment);
paymentRouter.get("/get-order-details", authUser, getUserOrderDetails);

export default paymentRouter;