import React, { useState } from "react";
import '../styles/dashboard.css';
import { MdDashboard } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdArticle } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import DashboardOverview from "./dashboardOverview";
import Transactions from "./Trasanctions";
import Settings from "./settings";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../api/api";
import Spinner from 'react-spinkit';

function DashboardSidebar() {
    const [dashboard, setDashboard ] = useState(true)
    const [transactions, setTransactions ] = useState('')
    const [settings, setSettings ] = useState('')
    const [loading, setLoading] = useState(true)
    
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
                    <li className="nav-item" key="item">
                        <Link to="" className={dashboard === true ? "nav-link active" : "nav-link"} aria-current="page" onClick={() => handleDashboard()}>
                            <MdDashboard  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                            Dashboard</Link>
                    </li>
                    <li className="nav-item" key="item2">
                        <Link to="" className={transactions === true ? "nav-link active" : "nav-link"}  onClick={() => handleTransaction()}> 
                        <MdArticle  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                            Transactions</Link>
                    </li> 
                    <li className="nav-item" key="item3">
                        <Link to="" className={settings === true ? "nav-link active" : "nav-link"}  onClick={() => handleSettings()} >
                        <MdSettings  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                            Settings</Link>
                    </li> 
                    <li className="nav-item" key="item4">
                        <Link to="/login" className="nav-link" onClick={() => signOut()} >
                        <BiLogInCircle  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                            Sign out</Link>
                    </li> 
                </ul>
            </div> 
            <div className="col-lg-9 col-sm-12 col-md-12 ms-lg-5">
                <h4 className="mt-5 link">Welcome, Maria 👋🏼</h4>
                <p>Let’s get you started with padipay</p>
                {dashboard && <DashboardOverview/>}
                {transactions && <Transactions/>}
                {settings && <Settings />}
            </div>
        </>
    );
}

export default DashboardSidebar;