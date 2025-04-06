import doctorModel from "../models/doctorModel";


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

export { changeAvailability };