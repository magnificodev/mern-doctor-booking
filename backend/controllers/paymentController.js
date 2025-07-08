import { createOrder, capturePayment, getOrderDetails } from "../services/paypalService.js";
import appointmentModel from "../models/appointmentModel.js";

const createUserOrder = async (req, res) => {
    try {
        const { amount, appointmentId } = req.body;

        // Check if appointment is cancelled or not found
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData || appointmentData.cancelled) {
            return res.status(404).json({
                success: false,
                message: "Appointment cancelled or not found"
            })
        }

        // Create order
        const { id } = await createOrder(amount, appointmentId);

        res.status(200).json({
            success: true,
            orderId: id
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const captureUserPayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const data = await capturePayment(orderId);

        const appointmentId = data.purchase_units[0].reference_id;

        if (data.status === "COMPLETED") {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                $set: {
                    payment: true
                }
            });
            return res.status(200).json({
                success: true,
                message: "Payment captured successfully"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Payment failed"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getUserOrderDetails = async (req, res) => { }

export {
    createUserOrder,
    captureUserPayment,
    getUserOrderDetails
}