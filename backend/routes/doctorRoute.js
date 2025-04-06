import express from "express";
import { changeAvailability } from "../controllers/doctorController.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = express.Router();


export default router;
