import { Router } from "express";
import { addDoctor, loginAdmin, getAllDoctors } from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", authAdmin, getAllDoctors);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
export default adminRouter;