import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "$";
    const [doctors, setDoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        doctors,
        currencySymbol,
        backendUrl,
    };

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
