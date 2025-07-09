import React from "react";
import { createContext } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const currency = "$";

    const calculateAge = (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

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

    const value = {
        calculateAge,
        slotDateFormatter,
        currency
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
