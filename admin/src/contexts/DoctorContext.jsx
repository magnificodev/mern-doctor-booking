import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dtoken, setDtoken] = useState(localStorage.getItem("dtoken") ?? "");
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState({});
    const [profileData, setProfileData] = useState({});

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/v1/doctor/appointments`,
                {
                    headers: {
                        dtoken: dtoken,
                    },
                }
            );
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const completeAppointment = async (doctorId, appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/v1/doctor/complete-appointment`,
                { doctorId, appointmentId },
                {
                    headers: {
                        dtoken: dtoken,
                    },
                }
            );
            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDashboardData();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const cancelAppointment = async (doctorId, appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/v1/doctor/cancel-appointment`,
                { doctorId, appointmentId },
                {
                    headers: {
                        dtoken: dtoken,
                    },
                }
            );
            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDashboardData();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/v1/doctor/dashboard`,
                {
                    headers: {
                        dtoken: dtoken,
                    },
                }
            );
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/v1/doctor/profile`,
                {
                    headers: {
                        dtoken: dtoken,
                    },
                }
            );
            if (data.success) {
                setProfileData(data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const value = {
        dtoken,
        setDtoken,
        backendUrl,
        appointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        getDashboardData,
        dashData,
        profileData,
        getProfileData,
        setProfileData,
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
