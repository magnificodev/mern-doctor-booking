import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../contexts/AdminContext";
import axios from "axios";
import { doctors } from "../../../../frontend/src/assets/assets.js";
const AddDoctor = () => {
    const [docImage, setDocImage] = useState(null);
    const [name, setName] = useState("Richard");
    const [email, setEmail] = useState("doc@gmail.com");
    const [password, setPassword] = useState("Doctor123@");
    const [experience, setExperience] = useState("1 Year");
    const [fees, setFees] = useState("1000");
    const [speciality, setSpeciality] = useState("General physician");
    const [degree, setDegree] = useState("MBBS");
    const [address1, setAddress1] = useState("123 Main St");
    const [address2, setAddress2] = useState("Apt 1");
    const [about, setAbout] = useState(
        "Richard is a general physician with 1 year of experience"
    );

    const { backendUrl, atoken } = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (!docImage) {
                toast.error("Please upload doctor image");
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", Number(fees));
            formData.append("speciality", speciality);
            formData.append("degree", degree);
            formData.append(
                "address",
                JSON.stringify({
                    line1: address1,
                    line2: address2,
                })
            );
            formData.append("about", about);
            formData.append("image", docImage);

            const { data } = await axios.post(
                `${backendUrl}/api/v1/admin/add-doctor`,
                formData,
                {
                    headers: {
                        atoken: atoken,
                    },
                }
            );

            if (data.success) {
                toast.success("Doctor added successfully");
                setDocImage(null);
                setName("");
                // setEmail("");
                // setPassword("");
                setFees("");
                setDegree("");
                setAddress1("");
                setAddress2("");
                setAbout("");
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    };

    return (
        <form className="w-full m-5" onSubmit={onSubmitHandler}>
            <p className="text-lg font-medium mb-3">Add Doctor</p>
            <div className="bg-white p-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex gap-4 items-center text-gray-500">
                    <label htmlFor="doc-img">
                        <img
                            className="w-16 bg-gray-200 rounded-full cursor-pointer"
                            src={
                                docImage
                                    ? URL.createObjectURL(docImage)
                                    : assets.upload_area
                            }
                            alt="user"
                        />
                    </label>
                    <input
                        type="file"
                        id="doc-img"
                        hidden
                        onChange={(e) => setDocImage(e.target.files[0])}
                    />
                    <p>
                        Upload doctor
                        <br /> picture
                    </p>
                </div>

                <div className="grid grid-cols lg:grid-cols-2 gap-10 mt-8 text-gray-600">
                    <div className="flex flex-col gap-4">
                        <div>
                            <p>Doctor name</p>
                            <input
                                className="w-full border rounded px-3 py-2 mt-1"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <p>Doctor Email</p>
                            <input
                                className="w-full border rounded px-3 py-2 mt-1"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <p>Set Password</p>
                            <input
                                className="w-full border rounded px-3 py-2 mt-1"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <p>Experience</p>
                            <select
                                className="w-full border rounded px-2 py-2 mt-1"
                                name=""
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            >
                                {Array.from(
                                    { length: 10, start: 1 },
                                    (_, i) => (
                                        <option
                                            key={i + 1}
                                            value={`${
                                                i + 1 > 1
                                                    ? `${i + 1} Years`
                                                    : `${i + 1} Year`
                                            }`}
                                        >
                                            {i + 1 > 1
                                                ? `${i + 1} Years`
                                                : `${i + 1} Year`}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                        <div>
                            <p>Fees</p>
                            <input
                                className="w-full border rounded px-3 py-2 mt-1"
                                type="number"
                                placeholder="Doctor fees"
                                value={fees}
                                onChange={(e) => setFees(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <p>Speciality</p>
                            <select
                                className="w-full border rounded px-2 py-2 mt-1"
                                name=""
                                value={speciality}
                                onChange={(e) => setSpeciality(e.target.value)}
                            >
                                <option value="General physician">
                                    General physician
                                </option>
                                <option value="Gynecologist">
                                    Gynecologist
                                </option>
                                <option value="Dermatologist">
                                    Dermatologist
                                </option>
                                <option value="Pediatricians">
                                    Pediatricians
                                </option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">
                                    Gastroenterologist
                                </option>
                            </select>
                        </div>
                        <div>
                            <p>Degree</p>
                            <input
                                className="w-full border rounded px-3 py-2 mt-1"
                                type="text"
                                placeholder="Degree"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <p>Address</p>
                            <div className="flex flex-col">
                                <input
                                    className="w-full border rounded px-3 py-2 mt-1"
                                    type="text"
                                    placeholder="Address 1"
                                    value={address1}
                                    onChange={(e) =>
                                        setAddress1(e.target.value)
                                    }
                                    required
                                />
                                <input
                                    className="w-full border rounded px-3 py-2 mt-1"
                                    type="text"
                                    placeholder="Address 2"
                                    value={address2}
                                    onChange={(e) =>
                                        setAddress2(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p>About Doctor</p>
                    <textarea
                        className="w-full border rounded px-3 py-2 mt-2 min-h-[159px]"
                        name=""
                        id=""
                        placeholder="Write something about doctor"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className="bg-primary text-white px-10 py-3 rounded-full mt-4">
                    Add doctor
                </button>
            </div>
        </form>
    );
};

export default AddDoctor;
