import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { specialityData } from "../assets/assets";

const Doctors = () => {
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const { speciality } = useParams();
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(
                doctors.filter((doctor) => doctor.speciality === speciality)
            );
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    return (
        <div>
            <p className="text-gray-600">
                Browse through the doctors specialist.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <button
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
                        showFilters ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setShowFilters((prev) => !prev)}
                >
                    Filters
                </button>
                <div
                    className={`flex-col gap-4 text-sm text-gray-600 ${
                        showFilters ? "flex" : "hidden sm:flex"
                    }`}
                >
                    {specialityData.map((item, index) => (
                        <p
                            key={index}
                            onClick={() =>
                                speciality === `${item.speciality}`
                                    ? navigate("/doctors")
                                    : navigate(`/doctors/${item.speciality}`)
                            }
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                                speciality === item.speciality
                                    ? "bg-indigo-100 text-black"
                                    : ""
                            }`}
                        >
                            {item.speciality}
                        </p>
                    ))}
                </div>
                <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                    {filterDoc.map((filterDoc, index) => (
                        <div
                            onClick={() =>
                                navigate(`/appointment/${filterDoc._id}`)
                            }
                            key={index}
                            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] transition-all duration-500"
                        >
                            <img
                                className="bg-blue-50"
                                src={filterDoc.image}
                                alt="Doctor Image"
                            />
                            <div className="p-4">
                                <div
                                    className={`flex items-center gap-2 text-sm text-center ${
                                        filterDoc.available
                                            ? "text-green-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    <p
                                        className={`w-2 h-2 ${
                                            filterDoc.available
                                                ? "bg-green-500"
                                                : "bg-gray-500"
                                        } rounded-full`}
                                    ></p>
                                    <p>
                                        {filterDoc.available
                                            ? "Available"
                                            : "Unavailable"}
                                    </p>
                                </div>
                                <p className="text-gray-900 text-lg font-medium">
                                    {filterDoc.name}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {filterDoc.speciality}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
