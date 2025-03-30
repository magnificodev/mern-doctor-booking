import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol } = useContext(AppContext);
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");

    const fetchDocInfo = async () => {
        const doctor = doctors.find((doctor) => doctor._id === docId);
        setDocInfo(doctor);
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);

        // Get current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            // Get date with index
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            // Set end time of the day with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            // Set hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedDate = currentDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                // Add slot to the array
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedDate,
                });

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots((prev) => [...prev, timeSlots]);
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots]);

    return (
        docInfo && (
            <div>
                {/* Doctor Details */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                        <img
                            className="bg-primary w-full sm:max-w-72 rounded-lg "
                            src={docInfo.image}
                            alt="Doctor Image"
                        />
                    </div>

                    <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                        {/* Doctor Info: name, degree, spcecialty, experience */}
                        <h4 className="flex items-center gap-2 text-3xl font-medium text-gray-900">
                            {docInfo.name}{" "}
                            <img
                                className="w-5"
                                src={assets.verified_icon}
                                alt="Verified Icon"
                            />
                        </h4>
                        <div className="flex items-center gap-2 text-md mt-1 text-gray-600">
                            <p>
                                {docInfo.degree} - {docInfo.speciality}
                            </p>
                            <span className="text-xs border px-2 py-0.5 rounded-full">
                                {docInfo.experience}
                            </span>
                        </div>

                        {/* Doctor About: about, fees */}
                        <div>
                            <h6 className="flex items-center gap-1 text-sm text-gray-900 font-medium mt-3">
                                About
                                <img
                                    className="w-3"
                                    src={assets.info_icon}
                                    alt="Info Icon"
                                />
                            </h6>
                            <p className="text-sm mt-1 text-gray-600 max-w-[700px]">
                                {docInfo.about}
                            </p>
                        </div>
                        <p className="font-medium text-gray-600 mt-4">
                            Appointment fee:{" "}
                            <span className="text-gray-900">
                                {currencySymbol}
                                {docInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Booking Slots */}
                <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
                    <h5>Booking slots</h5>

                    {/* Date slots */}
                    <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                        {docSlots.length &&
                            docSlots.map((docSlot, index) => (
                                <div
                                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                                        slotIndex === index
                                            ? "bg-primary text-white"
                                            : "border border-gray-200"
                                    }`}
                                    key={index}
                                    onClick={() => setSlotIndex(index)}
                                >
                                    <p>
                                        {docSlot[0] &&
                                            daysOfWeek[
                                                docSlot[0].datetime.getDay()
                                            ]}
                                    </p>
                                    <p>
                                        {docSlot[0] &&
                                            docSlot[0].datetime.getDate()}
                                    </p>
                                </div>
                            ))}
                    </div>

                    {/* Time slots */}
                    <div className="flex overflow-x-scroll items-center gap-3 mt-4">
                        {docSlots[slotIndex].length &&
                            docSlots[slotIndex].map((docSlot, index) => (
                                <div
                                    className={`text-sm font-light flex-shrink-0 lowercase px-5 py-2 rounded-full cursor-pointer ${
                                        slotTime === docSlot.time
                                            ? "bg-primary text-white"
                                            : "border border-gray-400 text-gray-400"
                                    }`}
                                    key={index}
                                    onClick={() => setSlotTime(docSlot.time)}
                                >
                                    {docSlot.time}
                                </div>
                            ))}
                    </div>

                    <button className="bg-primary text-sm font-light text-white px-20 my-6 rounded-full py-3 hover:scale-105 transition-all duration-300">
                        Book an appointment
                    </button>
                </div>

                {/* Related Doctors */}
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
        )
    );
};

export default Appointment;
