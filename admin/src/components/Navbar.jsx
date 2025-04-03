import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../contexts/AdminContext'

const Navbar = () => {
    const { atoken, setAtoken } = useContext(AdminContext);
    const navigate = useNavigate();

    const logout = () => {
        if (atoken) {
            setAtoken("");
            localStorage.removeItem("aToken");
            navigate("/");
        }
    }

    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
            <div className="flex items-center gap-2 text-xs">
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="admin logo" />
                <p className='border border-gray-500 text-gray-600 rounded-full px-2.5 py-0.5'>{atoken ? "Admin" : "Doctor"}</p>
            </div>
            <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">
                Logout
            </button>
        </div>
    )
}

export default Navbar