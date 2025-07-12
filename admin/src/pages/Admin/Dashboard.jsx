import { useContext, useEffect } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { AppContext } from "../../contexts/AppContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
    const { atoken, dashData, getDashboardData, cancelAppointment } =
        useContext(AdminContext);
    const { slotDateFormatter } = useContext(AppContext);

    useEffect(() => {
        if (atoken) {
            getDashboardData();
        }
    }, [atoken]);

    return (
        dashData && (
            <div className="m-5">
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                        <img
                            className="w-14"
                            src={assets.doctor_icon}
                            alt="Doctor Icon"
                        />
                        <div>
                            <p className="text-xl font-semibold text-gray-600">
                                {dashData.doctors}
                            </p>
                            <p className="text-gray-400">Doctors</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                        <img
                            className="w-14"
                            src={assets.appointments_icon}
                            alt="Appointment Icon"
                        />
                        <div>
                            <p className="text-xl font-semibold text-gray-600">
                                {dashData.appointments}
                            </p>
                            <p className="text-gray-400">Appointments</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
                        <img
                            className="w-14"
                            src={assets.patients_icon}
                            alt="Patient Icon"
                        />
                        <div>
                            <p className="text-xl font-semibold text-gray-600">
                                {dashData.patients}
                            </p>
                            <p className="text-gray-400">Patients</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white">
                    <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border">
                        <img src={assets.list_icon} alt="List Icon" />
                        <p className="font-semibold">Latest Bookings</p>
                    </div>

                    <div className="pt-4 border border-t-0">
                        {dashData.latestAppointments &&
                            dashData.latestAppointments.map(
                                (appointment, index) => (
                                    <div
                                        className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                                        key={index}
                                    >
                                        <img
                                            className="rounded-full w-10"
                                            src={appointment.docData.image}
                                            alt="Doctor Image"
                                        />
                                        <div className="flex-1 text-sm">
                                            <p className="text-gray-800 font-medium">
                                                {appointment.docData.name}
                                            </p>
                                            <p className="text-gray-600">
                                                {slotDateFormatter(
                                                    appointment.slotDate
                                                )}
                                            </p>
                                        </div>
                                        {appointment.cancelled ? (
                                            <p className="text-red-400 text-xs font-medium">
                                                Cancelled
                                            </p>
                                        ) : appointment.isCompleted ? (
                                            <p className="text-green-500 text-xs font-medium">
                                                Completed
                                            </p>
                                        ) : (
                                            <img
                                                className="w-10 cursor-pointer"
                                                src={assets.cancel_icon}
                                                alt="Cancel Button"
                                                onClick={() =>
                                                    cancelAppointment(
                                                        appointment._id
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                )
                            )}
                    </div>
                </div>
            </div>
        )
    );
};

export default Dashboard;
