import React, { useState } from "react";
import NavbarDashboard from "./NavbarDashboard";
import Transactions from "./Trasanctions";
import '../styles/dashboard.css';
import DashboardSidebar from "./dashboardSidebar";
import DashboardOverview from "./dashboardOverview";
import Settings from "./settings";

function Dashboard() {
    const [dashboardView,  setDashboardView ] = useState('');
    const [transactionsView, setTransactionsView ] = useState('');
    const [settingsView, setSettingsView ] = useState('');

    const dashboard = () => {

    }

    return (
        <div className="home-page">
            <NavbarDashboard />
            <div className="container-fluid dashboard-container">
                <div className="row">
                    <DashboardSidebar />
                </div>
            </div>
        </div>
      );
}

export default Dashboard;