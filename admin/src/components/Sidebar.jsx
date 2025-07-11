import React, { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../contexts/DoctorContext";

const Sidebar = () => {
    const { atoken } = useContext(AdminContext);
    const { dtoken } = useContext(DoctorContext);

    return (
        <div className="min-h-screen bg-white border-r">
            {atoken && (
                <ul className="text-[#515151] mt-5">
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive
                                    ? "bg-[#f2f3ff] border-r-4 border-primary "
                                    : ""
                            }`
                        }
                        to="/admin-dashboard"
                    >
                        <img src={assets.home_icon} alt="admin dashboard" />
                        <p className="hidden md:block">Dashboard</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive
                                    ? "bg-[#f2f3ff] border-r-4 border-primary "
                                    : ""
                            }`
                        }
                        to="/all-appointments"
                    >
                        <img
                            src={assets.appointment_icon}
                            alt="all appointments"
                        />
                        <p className="hidden md:block">Appointments</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive
                                    ? "bg-[#f2f3ff] border-r-4 border-primary "
                                    : ""
                            }`
                        }
                        to="/add-doctor"
                    >
                        <img src={assets.add_icon} alt="add doctor" />
                        <p className="hidden md:block">Add Doctor</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive
                                    ? "bg-[#f2f3ff] border-r-4 border-primary "
                                    : ""
                            }`
                        }
                        to="/doctor-list"
                    >
                        <img src={assets.people_icon} alt="doctors list" />
                        <p className="hidden md:block">Doctors List</p>
                    </NavLink>
                </ul>
            )}
            
            {dtoken && (
                <ul className="text-[#515151] mt-5">
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive
                                    ? "bg-[#f2f3ff] border-r-4 border-primary "
                                    : ""
                            }`
                        }
                        to="/doctor-dashboard"
                    >
                        <img src={assets.home_icon} alt="doctor dashboard" />
                        <p className="hidden md:block">Dashboard</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive
                                    ? "bg-[#f2f3ff] border-r-4 border-primary "
                                    : ""
                            }`
                        }
                        to="/doctor-appointments"
                    >
                        <img
                            src={assets.appointment_icon} 
                            alt="all appointments"
                        />
                        <p className="hidden md:block">Appointments</p>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                                isActive
                                    ? "bg-[#f2f3ff] border-r-4 border-primary "
                                    : ""
                            }`
                        }
                        to="/doctor-profile"
                    >
                        <img src={assets.people_icon} alt="doctor profile" />
                        <p className="hidden md:block">Profile</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
