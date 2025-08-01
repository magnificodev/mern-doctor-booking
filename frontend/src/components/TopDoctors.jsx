import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10">
            <h2 className="text-3xl font-medium">Top Doctors to Book</h2>
            <p className="sm:w-1/3 text-sm text-center">
                Simply browse through our extensive list of trusted doctors.
            </p>
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {doctors.slice(0, 10).map((doctor, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${doctor._id}`);
                            scrollTo(0, 0);
                        }}
                        key={index}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] transition-all duration-500"
                    >
                        <img
                            className="bg-blue-50"
                            src={doctor.image}
                            alt="Doctor Image"
                        />
                        <div className="p-4">
                            <div
                                className={`flex items-center gap-2 text-sm text-center ${
                                    doctor.available
                                        ? "text-green-500"
                                        : "text-gray-500"
                                }`}
                            >
                                <p
                                    className={`w-2 h-2 ${
                                        doctor.available
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                    } rounded-full`}
                                ></p>
                                <p>
                                    {doctor.available
                                        ? "Available"
                                        : "Unavailable"}
                                </p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">
                                {doctor.name}
                            </p>
                            <p className="text-gray-600 text-sm">
                                {doctor.speciality}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => {
                    navigate("/doctors");
                    scrollTo(0, 0);
                }}
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:underline"
            >
                MORE
            </button>
        </div>
    );
};

export default TopDoctors;
