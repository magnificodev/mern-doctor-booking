import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import userAuth from "../middlewares/authUser.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", userAuth, getProfile);

export default userRouter;
