import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "$";
    const [doctors, setDoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem("token") ?? "");
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("user")) ?? null
    );

    const value = {
        doctors,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
    };

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/v1/doctor/list`
            );
            if (data.success) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/v1/user/get-profile`,
                {
                    headers: {
                        token,
                    },
                }
            );
            if (data.success) {
                setUserData(data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null);
        }
    }, [token]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
