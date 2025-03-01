import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);

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
                {token ? (
                    <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img
                            className="w-8 rounded-full"
                            src={assets.profile_pic}
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
                                    onClick={() => setToken(false)}
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
            </div>
        </div>
    );
};

export default Navbar;
