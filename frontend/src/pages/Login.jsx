import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Login = () => {
    const [state, setState] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { backendUrl, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === "Sign Up") {
                const { data } = await axios.post(
                    `${backendUrl}/api/v1/user/register`,
                    { name, email, password }
                );
                if (data.success) {
                    setState("Log In");
                    toast.success(data.message);
                }
            } else {
                const { data } = await axios.post(
                    `${backendUrl}/api/v1/user/login`,
                    { email, password }
                );
                if (data.success) {
                    setToken(data.token);
                    localStorage.setItem("token", data.token);
                    navigate("/");
                    toast.success(data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="min-h-[80vh] flex items-center"
        >
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">
                    {state === "Sign Up" ? "Create Account" : "Login"}
                </p>
                <p>
                    Please {state === "Sign Up" ? "sign up" : "log in"} to book
                    appointment
                </p>

                {state === "Sign Up" && (
                    <div className="w-full">
                        <p>Full Name</p>
                        <input
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">
                    {state === "Sign Up" ? "Create account" : "Login"}
                </button>

                {state === "Sign Up" ? (
                    <p>
                        Already have an account?{" "}
                        <span
                            className="text-primary underline cursor-pointer"
                            onClick={() => setState("Log In")}
                        >
                            Login here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an new account?{" "}
                        <span
                            className="text-primary underline cursor-pointer"
                            onClick={() => setState("Sign Up")}
                        >
                            Click here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;
