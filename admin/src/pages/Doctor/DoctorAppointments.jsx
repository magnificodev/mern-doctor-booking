import { useContext, useEffect } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";
import { AppContext } from "../../contexts/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
    const { dtoken, appointments, getAppointments } = useContext(DoctorContext);
    const { currency, calculateAge, slotDateFormatter } =
        useContext(AppContext);

    useEffect(() => {
        if (dtoken) {
            getAppointments();
        }
    }, [dtoken]);

    return (
        <div className="w-full max-w-6xl m-5">
            <p className="mb-3 text-lg font-medium">All Appointments</p>
            <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
                <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b gap-1">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>
                {appointments.map((appointment, index) => (
                    <div
                        className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                        key={index}
                    >
                        <p className="max-sm:hidden">{index + 1}</p>
                        <div className="flex items-center gap-2">
                            <img
                                className="w-8 rounded-full"
                                src={appointment.userData.image}
                                alt="Patient Avatar"
                            />
                            <p>{appointment.userData.name}</p>
                        </div>
                        <div>
                            <p className="text-xs inline border border-primary px-2 rounded-full">
                                {appointment.payment ? "Online" : "Cash"}
                            </p>
                        </div>
                        <p className="max-sm:hidden">
                            {calculateAge(appointment.userData.birthday)}
                        </p>
                        <p>
                            {slotDateFormatter(appointment.slotDate)},{" "}
                            {appointment.slotTime}
                        </p>
                        <p>
                            {currency}
                            {appointment.docData.fees}
                        </p>
                        <div className="flex">
                            <img
                                className="w-10 cursor-pointer"
                                src={assets.cancel_icon}
                                alt="Cancel Button"
                                onClick={() =>
                                    cancelAppointment(appointment._id)
                                }
                            />
                            <img
                                className="w-10 cursor-pointer"
                                src={assets.tick_icon}
                                alt="Cancel Button"
                                onClick={() =>
                                    cancelAppointment(appointment._id)
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointments;
