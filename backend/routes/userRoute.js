import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/userController.js";
import userAuth from "../middlewares/authUser.js";
import upload from "../config/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", userAuth, getProfile);
userRouter.put("/update-profile", upload.single("image"), userAuth, updateProfile);

export default userRouter;
