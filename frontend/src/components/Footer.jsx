import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* Left Section */}
                <div>
                    <img src={assets.logo} alt="logo" className="w-40 mb-5" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </p>
                </div>
                {/* Center Section */}
                <div>
                    <h3 className="text-xl font-medium mb-5">COMPANY</h3>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">About us</a>
                        </li>
                        <li>
                            <a href="#">Delivery</a>
                        </li>
                        <li>
                            <a href="#">Privacy policy</a>
                        </li>
                    </ul>
                </div>
                {/* Right Section */}
                <div>
                    <h3 className="text-xl font-medium mb-5">GET IN TOUCH</h3>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+84 123456789</li>
                        <li>richardnguyen26th8@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                    Copyright 2024 @Magnificodev - All Right Reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
