import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: "Richard Nguyen",
        email: "richardnguyen26th8@gmail.com",
        phone: "0123456789",
        address: {
            line1: "Thu Duc City",
            line2: "Ho Chi Minh City",
        },
        gender: "Male",
        birthday: "2002-08-26",
        avatar: assets.profile_pic,
    });

    const [isEdit, setIsEdit] = useState(false);

    const handleSaveInformation = async () => {
        // TODO: Save information to database
    };

    console.log(userData.birthday);

    return (
        <div className="max-w-lg flex flex-col gap-2 text-sm mt-10">
            <img className="w-36 rounded" src={userData.avatar} alt="" />
            {isEdit ? (
                <input
                    className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
                    type="text"
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    value={userData.name}
                />
            ) : (
                <h2 className="font-medium text-3xl text-neutral-800 mt-4">
                    {userData.name}
                </h2>
            )}

            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
                <h5 className="text-gray-600 mt-3 underline">
                    CONTACT INFORMATION
                </h5>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Email id:</p>
                    <p className="text-blue-500">{userData.email}</p>

                    <p className="font-medium">Phone:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-50"
                            type="text"
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                            value={userData.phone}
                        />
                    ) : (
                        <p className="text-blue-500">{userData.phone}</p>
                    )}

                    <p className="font-medium">Address:</p>
                    {isEdit ? (
                        <>
                            <input
                                className="bg-gray-50"
                                type="text"
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        address: { line1: e.target.value },
                                    }))
                                }
                                value={userData.address.line1}
                            />
                            <br />
                            <input
                                className="bg-gray-50"
                                type="text"
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        address: { line2: e.target.value },
                                    }))
                                }
                                value={userData.address.line2}
                            />
                        </>
                    ) : (
                        <p className="text-gray-500">
                            {userData.address.line1}
                            <br />
                            {userData.address.line2}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <h5 className="text-gray-500 mt-3 underline">
                    BASIC INFORMATION
                </h5>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Gender:</p>
                    {isEdit ? (
                        <select
                            className="bg-gray-50 max-w-20"
                            value={userData.gender}
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    gender: e.target.value,
                                }))
                            }
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className="text-gray-500">
                            {userData.gender || "Not Selected"}
                        </p>
                    )}

                    <p className="font-medium">Birthday:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-50 max-w-28"
                            type="date"
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    birthday: e.target.value,
                                }))
                            }
                            value={userData.birthday}
                        />
                    ) : (
                        <p className="text-gray-500">
                            {userData.birthday || "Not Selected"}
                        </p>
                    )}
                </div>
            </div>
            <div className="mt-10">
                {isEdit ? (
                    <button
                        className="border border-primary rounded-full px-8 py-2 text-sm hover:text-white hover:bg-primary transition-all duration-300"
                        onClick={handleSaveInformation}
                    >
                        Save information
                    </button>
                ) : (
                    <button
                        className="border border-primary rounded-full px-8 py-2 text-sm hover:text-white hover:bg-primary transition-all "
                        onClick={() => setIsEdit(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
