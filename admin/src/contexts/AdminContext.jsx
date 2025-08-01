import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [atoken, setAtoken] = useState(localStorage.getItem("atoken") ?? "");
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState({});
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/v1/admin/all-doctors`,
                {
                    headers: { atoken: atoken },
                }
            );
            if (data.success) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const changeAvailability = async (doctorId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/v1/admin/change-availability`,
                {
                    doctorId,
                },
                {
                    headers: { atoken: atoken },
                }
            );
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/v1/admin/all-appointments`,
                {
                    headers: { atoken: atoken },
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

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/v1/admin/cancel-appointment`,
                { appointmentId },
                {
                    headers: { atoken: atoken },
                }
            );
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
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
                `${backendUrl}/api/v1/admin/dashboard`,
                {
                    headers: { atoken: atoken },
                }
            );
            if (data.success) {
                setDashData(data.dashData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const value = {
        atoken,
        setAtoken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        getAllAppointments,
        appointments,
        cancelAppointment,
        getDashboardData,
        dashData,
    };

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    );
};

export default AdminContextProvider;
