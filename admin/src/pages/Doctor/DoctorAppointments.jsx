import { useContext, useEffect } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";

const DoctorAppointments = () => {
    const { dtoken, appointments, getAppointments } = useContext(DoctorContext);
    console.log(appointments);
    useEffect(() => {
        if (dtoken) {
            getAppointments();
        }
    }, [dtoken]);


    return <div>
        <h1>Doctor Appointments</h1>
        <div>
            {appointments.map((appointment) => (
                <div key={appointment._id}>{appointment.patientName}</div>
            ))}
        </div>
    </div>;
};

export default DoctorAppointments;
