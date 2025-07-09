import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./contexts/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./contexts/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

// Protected route components
const AdminRoute = ({ children }) => {
    const { atoken } = useContext(AdminContext);
    return atoken ? children : <Navigate to="/" />;
};

const DoctorRoute = ({ children }) => {
    const { dtoken } = useContext(DoctorContext);
    return dtoken ? children : <Navigate to="/" />;
};

const App = () => {
    const { atoken } = useContext(AdminContext);
    const { dtoken } = useContext(DoctorContext);

    return (
        <>
            {atoken || dtoken ? (
                <div className="bg-[#f8f9fd]">
                    <Navbar />
                    <div className="flex items-start ">
                        <Sidebar />
                        <Routes>
                            <Route path="/" element={<></>} />

                            {/* Admin Routes */}
                            <Route
                                path="/admin-dashboard"
                                element={
                                    <AdminRoute>
                                        <Dashboard />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/add-doctor"
                                element={
                                    <AdminRoute>
                                        <AddDoctor />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/all-appointments"
                                element={
                                    <AdminRoute>
                                        <AllAppointments />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/doctor-list"
                                element={
                                    <AdminRoute>
                                        <DoctorsList />
                                    </AdminRoute>
                                }
                            />

                            {/* Doctor Routes */}
                            <Route
                                path="/doctor-dashboard"
                                element={
                                    <DoctorRoute>
                                        <DoctorDashboard />
                                    </DoctorRoute>
                                }
                            />
                            <Route
                                path="/doctor-appointments"
                                element={
                                    <DoctorRoute>
                                        <DoctorAppointments />
                                    </DoctorRoute>
                                }
                            />
                            <Route
                                path="/doctor-profile"
                                element={
                                    <DoctorRoute>
                                        <DoctorProfile />
                                    </DoctorRoute>
                                }
                            />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Login />
            )}
            <ToastContainer position="bottom-right" />
        </>
    );
};

export default App;
