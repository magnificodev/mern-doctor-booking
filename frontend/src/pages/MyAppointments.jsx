import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const MyAppointments = () => {
    const { doctors } = useContext(AppContext);

    return (
        <div>
            <h4 className="text-lg mt-12 pb-3 border-b text-gray-600 font-medium">
                My appointments
            </h4>
            <div>
                {doctors.slice(0, 2).map((doctor) => (
                    <div
                        className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
                        key={doctor._id}
                    >
                        <div>
                            <img
                                className="w-36 bg-indigo-50"
                                src={doctor.image}
                                alt="Doctor Image"
                            />
                        </div>
                        <div className="flex-1 text-zinc-600 text-sm">
                            <h5 className="font-semibold text-base text-neutral-800">
                                {doctor.name}
                            </h5>
                            <p className="text-sm">
                                {doctor.speciality}
                            </p>
                            <h6 className="font-medium text-zinc-700 mt-1">
                                Address:
                            </h6>
                            <p>
                                {doctor.address.line1}
                                <br />
                                {doctor.address.line2}
                            </p>
                            <h6 className="font-medium text-zinc-700 mt-1">
                                Date & Time:{" "}
                                <span className="font-normal">
                                    31 Apr 2025 | 04:30 PM
                                </span>
                            </h6>
                        </div>
                        <div></div>
                        <div className="flex flex-col justify-end gap-2 text-sm text-zinc-600">
                            <button className="sm:min-w-48 border rounded px-8 py-2 hover:bg-primary hover:text-white transition-all duration-300">Pay Online</button>
                            <button className="sm:min-w-48 border rounded px-8 py-2 hover:bg-red-600 hover:text-white transition-all duration-300">Cancel appointment</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
