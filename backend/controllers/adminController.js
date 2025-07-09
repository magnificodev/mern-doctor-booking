import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Validating strong password
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Try a stronger password!"
            });
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Uploading image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            folder: "doctors",
        });
        const imageUrl = uploadResponse.secure_url;

        // Creating doctor object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            image: imageUrl,
        }

        // Adding doctor to database
        await doctorModel.create(doctorData);

        // Returning response
        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Checking for all data to login admin
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Checking for admin email & password
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return res.status(200).json({
                success: true,
                message: "Admin logged in successfully",
                token: jwt.sign({ email, password }, process.env.JWT_ADMIN_AUTH_SECRET)
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

// API for getting all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            doctors
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

// API for getting all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            appointments
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

// API for cancelling appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // Get the appointment data and remove the slot from the doctor's slots_booked
        const appointment = await appointmentModel.findById(appointmentId);
        const { doctorId, slotDate, slotTime } = appointment;
        const docData = await doctorModel.findById(doctorId);
        const slots_booked = docData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked }, { new: true });

        // Cancel the appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

// API for getting dashboard data for admin panel
const getDashboardData = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            dashData
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export { addDoctor, loginAdmin, getAllDoctors, getAllAppointments, cancelAppointment, getDashboardData };