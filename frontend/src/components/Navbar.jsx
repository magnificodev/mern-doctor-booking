import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/");
    };
    return (
        <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400">
            <img
                onClick={() => navigate("/")}
                src={assets.logo}
                alt="Logo"
                className="w-44 cursor-pointer"
            />
            <ul className="hidden md:flex gap-5 font-medium">
                <NavLink to="/">
                    <li className="py-1">HOME</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto rounded-full hidden" />
                </NavLink>
                <NavLink to="/doctors">
                    <li className="py-1">ALL DOCTORS</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto rounded-full hidden" />
                </NavLink>
                <NavLink to="/about">
                    <li className="py-1">ABOUT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto rounded-full hidden" />
                </NavLink>
                <NavLink to="/contact">
                    <li className="py-1">CONTACT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto rounded-full hidden" />
                </NavLink>
            </ul>
            <div className="flex gap-4 items-center">
                {token && userData ? (
                    <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img
                            className="w-8 rounded-full"
                            src={userData.image}
                            alt="Profile Pic"
                        />
                        <img
                            className="w-2.5"
                            src={assets.dropdown_icon}
                            alt="Dropdown Icon"
                        />
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                            <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                <p
                                    onClick={() => navigate("/my-profile")}
                                    className="hover:text-black cursor-pointer transition-all duration-300"
                                >
                                    My Profile
                                </p>
                                <p
                                    onClick={() => navigate("/my-appointments")}
                                    className="hover:text-black cursor-pointer transition-all duration-300"
                                >
                                    My Appointments
                                </p>
                                <p
                                    onClick={logout}
                                    className="hover:text-black cursor-pointer transition-all duration-300"
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
                        onClick={() => navigate("/login")}
                    >
                        Create account
                    </button>
                )}
                <img
                    src={assets.menu_icon}
                    alt="Menu Icon"
                    className="w-6 md:hidden"
                    onClick={() => setShowMenu(true)}
                />
                <div
                    className={`fixed right-0 top-0 bg-white h-full w-full transition-all duration-300 z-10 ${
                        showMenu ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex justify-between items-center px-5 py-6">
                        <img
                            src={assets.logo}
                            alt="Logo"
                            className="w-36 cursor-pointer"
                        />
                        <img
                            src={assets.cross_icon}
                            alt="Close Icon"
                            className="w-7 cursor-pointer"
                            onClick={() => setShowMenu(false)}
                        />
                    </div>
                    <ul className="flex flex-col items-center uppercase text-lg font-medium mt-5 gap-2">
                        <NavLink onClick={() => setShowMenu(false)} to="/">
                            {({ isActive }) => (
                                <li
                                    className={`py-2 px-4 inline-block rounded ${
                                        isActive ? "bg-primary text-white" : ""
                                    }`}
                                >
                                    Home
                                </li>
                            )}
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to="/doctors"
                        >
                            {({ isActive }) => (
                                <li
                                    className={`py-2 px-4 inline-block rounded ${
                                        isActive ? "bg-primary text-white" : ""
                                    }`}
                                >
                                    All Doctors
                                </li>
                            )}
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/about">
                            {({ isActive }) => (
                                <li
                                    className={`py-2 px-4 inline-block rounded ${
                                        isActive ? "bg-primary text-white" : ""
                                    }`}
                                >
                                    About
                                </li>
                            )}
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to="/contact"
                        >
                            {({ isActive }) => (
                                <li
                                    className={`py-2 px-4 inline-block rounded ${
                                        isActive ? "bg-primary text-white" : ""
                                    }`}
                                >
                                    Contact
                                </li>
                            )}
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
