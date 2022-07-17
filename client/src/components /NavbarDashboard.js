import React from "react";
import logo from '../images/Logo.png';
import avatar from '../images/avatar.png';
import '../styles/dashboard.css';
import notification from '../images/Notification.png';
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { logout } from "../api/api";
import styled from "styled-components";

function NavbarDashboard() {
    const navigate = useNavigate();

    return ( 
        <div className="dashboard">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                            <div className="col">
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