import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
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
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
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
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { addDoctor, loginAdmin };