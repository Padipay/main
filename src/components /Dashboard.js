import React from "react";
import NavbarDashboard from "./NavbarDashboard";
import '../styles/dashboard.css';
import DashboardSidebar from "./dashboardSidebar";

function Dashboard() {
    return (
        <div className="home-page">
            {/* <NavbarDashboard /> */}
            <div className="container-fluid dashboard-container">
                <div className="row">
                    <DashboardSidebar />
                </div>
            </div>
        </div>
      );
}

export default Dashboard;