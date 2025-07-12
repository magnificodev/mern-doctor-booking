import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import PaypalCheckoutButton from "../components/PaypalCheckoutButton";

const MyAppointments = () => {
    const { backendUrl, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const slotDateFormatter = (slotDate) => {
        const dateArray = slotDate.split("-");
        return `${dateArray[0]} ${months[dateArray[1] - 1]} ${dateArray[2]}`;
    };

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/v1/user/appointments`,
                {
                    headers: {
                        token,
                    },
                }
            );
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const onPaymentSuccess = async (appointmentId) => {
        toast.success("Payment successful");
        getUserAppointments();
        getDoctorsData();
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/v1/user/cancel-appointment`,
                { appointmentId },
                {
                    headers: { token },
                }
            );
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div>
            <h4 className="text-lg mt-12 pb-3 border-b text-gray-600 font-medium">
                My appointments
            </h4>
            <div>
                {appointments.map((appointment) => (
                    <div
                        className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
                        key={appointment._id}
                    >
                        <div>
                            <img
                                className="w-36 bg-indigo-50"
                                src={appointment.docData.image}
                                alt="Doctor Image"
                            />
                        </div>
                        <div className="flex-1 text-zinc-600 text-sm">
                            <h5 className="font-semibold text-base text-neutral-800">
                                {appointment.docData.name}
                            </h5>
                            <p className="text-sm">
                                {appointment.docData.speciality}
                            </p>
                            <h6 className="font-medium text-zinc-700 mt-1">
                                Address:
                            </h6>
                            <p>
                                {appointment.docData.address.line1}
                                <br />
                                {appointment.docData.address.line2}
                            </p>
                            <h6 className="font-medium text-zinc-700 mt-1">
                                Date & Time:{" "}
                                <span className="font-normal">
                                    {`${slotDateFormatter(
                                        appointment.slotDate
                                    )} | ${appointment.slotTime}`}
                                </span>
                            </h6>
                        </div>
                        <div></div>
                        <div className="flex flex-col justify-end gap-2 text-sm text-zinc-600">
                            {!appointment.cancelled && appointment.payment && (
                                <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                                    Paid
                                </button>
                            )}
                            {!appointment.cancelled && !appointment.payment && !appointment.isCompleted && (
                                <PaypalCheckoutButton
                                    amount={appointment.amount}
                                    appointmentId={appointment._id}
                                    onPaymentSuccess={onPaymentSuccess}
                                />
                            )}
                            {!appointment.cancelled && !appointment.isCompleted && (
                                <button
                                    onClick={() =>
                                        cancelAppointment(appointment._id)
                                    }
                                    className="sm:min-w-48 border rounded px-8 py-2 hover:bg-red-600 hover:text-white transition-all duration-300"
                                >
                                    Cancel appointment
                                </button>
                            )}
                            {appointment.cancelled && !appointment.isCompleted && (
                                <button className="sm:min-w-48 border border-red-500 rounded py-2 text-red-500">
                                    Appointment cancelled
                                </button>
                            )}
                            {appointment.isCompleted && (<button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
