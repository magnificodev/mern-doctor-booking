import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../contexts/AdminContext";
import { toast } from 'react-toastify';
import axios from "axios";

const Login = () => {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAtoken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === "Admin") {
                const { data } = await axios.post(
                    `${backendUrl}/api/v1/admin/login`,
                    {
                        email,
                        password,
                    }
                );

                if (data.success) {
                    localStorage.setItem("atoken", data.token);
                    setAtoken(data.token);
                    toast.success("Login successful");
                }
            } else {
                
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="min-h-[80vh] flex items-center"
        >
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-primary">{state}</span> Login{" "}
                </p>
                <div className="w-full">
                    <p>Email</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-[#dadada] rounded p-2 mt-1 w-full"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-[#dadada] rounded p-2 mt-1 w-full"
                        type="password"
                        required
                    />
                </div>
                <button className="bg-primary text-base text-white rounded p-2 w-full">
                    Login
                </button>
                <p>
                    {state === "Admin" ? "Doctor" : "Admin"} Login?{" "}
                    <span
                        onClick={() =>
                            setState(state === "Admin" ? "Doctor" : "Admin")
                        }
                        className="text-primary underline cursor-pointer"
                    >
                        Click here
                    </span>
                </p>
            </div>
        </form>
    );
};

export default Login;
