import React, { useState } from "react";
import '../styles/dashboard.css';
import { MdDashboard } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdArticle } from "react-icons/md";
import DashboardOverview from "./dashboardOverview";
import Transactions from "./Trasanctions";
import Settings from "./settings";

function DashboardSidebar() {
    const [dashboard, setDashboard ] = useState(true)
    const [transactions, setTransactions ] = useState('')
    const [settings, setSettings ] = useState('')

    const handleTransaction = () => {
        setTransactions(true)
        setDashboard(false)
        setSettings(false)
    }

    const handleDashboard = () => {
        setDashboard(true)
        setTransactions(false)
        setSettings(false)
    }

    const handleSettings = () => {
        setSettings(true)
        setDashboard(false)
        setTransactions(false)
    }
    
    return (  
        <>
            <div className="col-lg-2 col-sm-12 col-md-12 sidebar">
                <ul className="nav nav-pills nav-fill flex-column mt-5">
                    <li className="nav-item">
                        <a className={dashboard === true ? "nav-link active" : "nav-link"} aria-current="page" onClick={() => handleDashboard()}>
                            <MdDashboard  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                            Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className={transactions === true ? "nav-link active" : "nav-link"}  onClick={() => handleTransaction()}> 
                        <MdArticle  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                            Transactions</a>
                    </li> 
                    <li className="nav-item">
                        <a className={settings === true ? "nav-link active" : "nav-link"}  onClick={() => handleSettings()} >
                        <MdSettings  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                            Settings</a>
                    </li> 
                </ul>
            </div> 

            <div className="col-lg-9 col-sm-12 col-md-12 ms-lg-5">
                <h4 className="mt-5">Welcome, Maria 👋🏼</h4>
                <p>Let’s get you started with padipay</p>
                {dashboard && <DashboardOverview/>}
                {transactions && <Transactions/>}
                {settings && <Settings />}
            </div>
        </>
    );
}

export default DashboardSidebar;