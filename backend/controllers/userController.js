import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

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

// API to book an appointment

const bookAppointment = async (req, res) => {
    try {
        const { userId } = req.user;
        const { doctorId, slotDate, slotTime } = req.body;

        console.log(doctorId, slotDate, slotTime);

        if (!doctorId || !slotDate || !slotTime) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const docData = await doctorModel.findById(doctorId).select("-password");

        if (!docData.available) {
            return res.status(400).json({
                success: false,
                message: "Doctor is not available"
            })
        }

        const slots_booked = docData.slots_booked;

        // Check if the slot is already booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({
                    success: false,
                    message: "Slot is already booked"
                })
            }
            else {
                slots_booked[slotDate].push(slotTime);
            }
        }
        else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select("-password");
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            doctorId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
        console.log("Appointment saved");

        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
            newAppointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// API to get all appointments of a user
const getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.user;
        const appointments = await appointmentModel.find({ userId });
        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            appointments
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { userId } = req.user;
        const { appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment not found!"
            })
        }

        // Verify if the user is the one who booked the appointment
        if (appointment.userId.toString() !== userId.toString()) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to cancel this appointment!"
            })
        }

        // Cancel the appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true }, { new: true });

        // Remove the slot from the doctor's slots_booked
        const { doctorId, slotDate, slotTime } = appointment;
        const docData = await doctorModel.findById(doctorId);
        const slots_booked = docData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getUserAppointments, cancelAppointment };