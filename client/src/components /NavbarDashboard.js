import React from "react";
import logo from '../images/Logo.png';
import avatar from '../images/avatar.png';
import '../styles/dashboard.css';
import notification from '../images/Notification.png';
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { MdDashboard } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdArticle } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";

function NavbarDashboard({handleDashboard, handleSettings, handleTransaction, logOut}) {
    const navigate = useNavigate();

    return ( 
        <div className="dashboard">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <div className="navbar-items ms-auto mt-4">
                        <div className="row">
                            <ul className="navigation-items mt-4">
                                <li>
                                    <Link to="" className="link" onClick={handleDashboard}>
                                        <MdDashboard  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>Dashboard
                                    </Link>
                                </li>
                                <li className="mt-4">
                                    <Link to="" className="link" onClick={handleTransaction}> 
                                        <MdArticle  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>Transactions
                                    </Link>
                                </li>
                                <li className="mt-4">
                                    <Link to="" className="link" onClick={handleSettings}>
                                        <MdSettings  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>Settings
                                    </Link>
                                </li>
                                <li className="mt-4">
                                    <Link to="/login" className="link" onClick={logOut}>
                                        <BiLogInCircle  size={20} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>Sign out
                                    </Link>
                                </li>
                            </ul>
                            <div className="send-btn">
                                <Link to="/send">
                                    <button className="btn btn-primary btn-lg">Send Money</button>
                                </Link>
                            </div>
                            {/* <div className="col-2">
                                <img src={notification} alt="" />
                            </div> */}
                            {/* <div className="col-2 avatar">
                                <img src={avatar} alt="" />
                            </div> */}
                            {/* <div className="col-3">
                                <span className="username">@maria_xx</span>
                            </div> */}
                            {/* <div className="col-3 drop-down-icon">
                                <IoIosArrowDown size={30}/>
                                <div className="dropdown-content">
                                    <Link className="links" onClick={handleLogout} to="/">
                                        <p>Logout</p>
                                    </Link>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default NavbarDashboard;