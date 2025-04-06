import doctorModel from "../models/doctorModel.js";


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

export { changeAvailability, doctorList };