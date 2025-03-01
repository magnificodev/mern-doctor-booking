import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
    return (
        <div
            className="flex flex-col items-center text-center gap-4 py-16 text-gray-800"
            id="speciality"
        >
            <h2 className="text-3xl font-medium">Find By Speciality</h2>
            <p className="sm:w-1/3 text-sm">
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
            </p>
            <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
                {specialityData.map((item) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        key={item.speciality}
                        className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
                        onClick={() => scrollTo(0, 0)}
                    >
                        <img
                            className="w-16 sm:w-24 mb-2"
                            src={item.image}
                            alt={item.speciality}
                        />
                        <span>{item.speciality}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
