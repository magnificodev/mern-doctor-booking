import { useContext, useEffect } from "react";
import { AdminContext } from "../../contexts/AdminContext";

const Dashboard = () => {
    const { atoken, dashData, getDashboardData } = useContext(AdminContext);

    console.log(dashData);

    useEffect(() => {
        if (atoken) {
            getDashboardData();
        }
    }, [atoken]);

    return <div>Dashboard</div>;
};

export default Dashboard;
