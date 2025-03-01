import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20 bg-primary rounded-lg">
            {/* left side */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
                <h1 className="w-full text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight text-center md:text-left">
                    Book Appointment <br /> With Trusted Doctors
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
                    <img
                        className="w-28"
                        src={assets.group_profiles}
                        alt="Group Profiles"
                    />
                    <p className="text-center md:text-left">
                        Simply browse through our extensive list of trusted
                        doctors,{" "}
                        <br className="hidden sm:block text-center md:text-left" />
                        schedule your appointment hassle-free.
                    </p>
                </div>
                <a
                    className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-sm hover:scale-105 transition-all duration-500 text-gray-600 m-auto md:m-0"
                    href="#speciality"
                >
                    Book appointment{" "}
                    <img
                        className="w-3"
                        src={assets.arrow_icon}
                        alt="Arrow Icon"
                    />
                </a>
            </div>

            {/* right side */}
            <div className="md:w-1/2 relative">
                <img
                    className="w-full md:absolute bottom-0 h-auto rounded-lg"
                    src={assets.header_img}
                    alt="Header Image"
                />
            </div>
        </div>
    );
};

export default Header;
