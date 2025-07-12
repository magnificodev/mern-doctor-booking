import express from "express";
import { doctorList, loginDoctor, doctorAppointments, completeAppointment, cancelAppointment, doctorDashboardData, doctorProfileData, updateDoctorProfile } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, doctorAppointments);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);
doctorRouter.get("/dashboard", authDoctor, doctorDashboardData);
doctorRouter.get("/profile", authDoctor, doctorProfileData);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
