import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { doctorId } = req.body;

        const doctorData = await doctorModel.findById(doctorId);
        await doctorModel.findByIdAndUpdate(doctorId, {
            available: !doctorData.available
        })

        res.status(200).json({
            success: true,
            message: "Availability changed successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find().select(["-password", "-email"]);
        res.status(200).json({
            success: true,
            doctors
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// API for doctor login
const loginDoctor = async (req, res) => {
    try {
        console.log("Doctor is logging in")
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.status(400).json({ success: false, message: "Doctor not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, doctor.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ doctorId: doctor._id }, process.env.JWT_DOCTOR_AUTH_SECRET);

        console.log(token)

        res.status(200).json({
            success: true,
            message: "Doctor logged in successfully",
            doctor,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// API to get doctor appointments for doctor panel
const doctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.doctor;
        const appointments = await appointmentModel.find({ doctorId })
        res.status(200).json({
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

// API to complete appointment for doctor panel 
const completeAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.doctorId.toString() === doctorId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                isCompleted: true,
            })
            return res.status(200).json({
                success: true,
                message: "Appointment completed successfully"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to complete this appointment"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// API to cancel appointment for doctor panel 
const cancelAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.doctorId.toString() === doctorId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                cancelled: true,
            })
            return res.status(200).json({
                success: true,
                message: "Appointment cancelled successfully"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to cancel this appointment"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// API to get all doctor dashboard data
const doctorDashboardData = async (req, res) => {
    try {
        const { doctorId } = req.doctor;
        const appointments = await appointmentModel.find({ doctorId });

        let earnings = 0;
        appointments.map(appointment => {
            if (appointment.isCompleted || appointment.payment) {
                earnings += appointment.docData.fees;
            }
        })

        let patients = [];

        appointments.map(appointment => {
            if (!patients.includes(appointment.userId)) {
                patients.push(appointment.userId);
            }
        })

        const dashData = {
            earnings,
            patients: patients.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            dashData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// API to get doctor profile data
const doctorProfileData = async (req, res) => {
    try {
        const { doctorId } = req.doctor;
        const profileData = await doctorModel.findById(doctorId).select("-password");
        res.status(200).json({
            success: true,
            message: "Doctor profile data fetched successfully",
            profileData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.doctor;
        const { fees, address, available } = req.body;
        const profileData = await doctorModel.findByIdAndUpdate(doctorId, {
            fees,
            address,
            available
        })
        res.status(200).json({
            success: true,
            message: "Doctor profile data updated successfully",
            profileData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export { changeAvailability, doctorList, loginDoctor, doctorAppointments, completeAppointment, cancelAppointment, doctorDashboardData, doctorProfileData, updateDoctorProfile };