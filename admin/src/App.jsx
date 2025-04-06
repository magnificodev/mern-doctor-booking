import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./contexts/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorsList from "./pages/Admin/DoctorsList";

const App = () => {
    const { atoken } = useContext(AdminContext);

    return atoken ? (
        <div className="bg-[#f8f9fd]">
            <Navbar />
            <div className="flex items-start ">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<></>} />
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route
                        path="/all-appointments"
                        element={<AllAppointments />}
                    />
                    <Route path="/doctor-list" element={<DoctorsList />} />
                </Routes>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    ) : (
        <>
            <Login />
            <ToastContainer />
        </>
    );
};

export default App;
