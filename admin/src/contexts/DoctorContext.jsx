import { useState } from "react";
import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dtoken, setDtoken] = useState(localStorage.getItem("dtoken") ?? "");

    const value = {
        dtoken,
        setDtoken,
        backendUrl
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
