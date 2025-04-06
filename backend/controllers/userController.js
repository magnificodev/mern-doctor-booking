import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Try a stronger password"
            })
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_USER_AUTH_SECRET);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId);
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { userId } = req.user;
        const { name, phone, address, gender, birthday } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !address || !gender || !birthday) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), gender, birthday }, { new: true });

        if (imageFile) {
            const imageUrl = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
                folder: "users"
            });
            await userModel.findByIdAndUpdate(userId, { image: imageUrl.secure_url }, { new: true });
        }

        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { registerUser, loginUser, getProfile, updateProfile };