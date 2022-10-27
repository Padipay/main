import React, { useEffect } from "react";
import '../../styles/authentication/dashboard.css';
import SideNavbar from "./SideNavbar";
import DashboardOverview from "./dashboardOverview";
import { useDispatch } from "react-redux";
import DashboardInfo from "./DashboardInfo";
import { getUser } from "../../redux/auth/actions/actions";
import "react-loading-skeleton/dist/skeleton.css";


function Dashboard() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])
    return (
        <div className="home-page">
            <div className="container-fluid dashboard-container">
                <div className="row">
                    <SideNavbar />
                    <div className="col-lg-9 col-sm-12 col-md-12 ms-lg-5">
                        <DashboardInfo />
                        <div className="dashboard-container">
                            <DashboardOverview />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default Dashboard;