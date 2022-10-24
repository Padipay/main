import React from "react";
import logo from '../../images/Logo.png';
import avatar from '../../images/avatar.png';
import { BiLogInCircle } from "react-icons/bi";
import '../../styles/dashboard.css';
import '../../styles/Header.css'
import '../../styles/navbar.css';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function DashboardMenu({values, logout}) {
    const {auth_user} = useSelector(state => state.auth_details)

    return ( 
        <div className="dashboard">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/" className="dashboard-logo">
                        <img src={logo} alt="" />
                    </Link>
                    <button className="fancy-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <div className="demo">
                            <div className="menu">
                                <input className="menu-icon__cheeckbox" type="checkbox" />
                                <div>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <div className="navbar-items ms-auto mt-4">
                            <div className="row">
                                <div className="col me-4">
                                    <img src={avatar} alt="" className="me-2"/>
                                    {auth_user !=null ? <span>{auth_user.FirstName}</span> : null}
                                </div>
                                <ul className="nav nav-pills nav-fill flex-column mt-3 d-md-block d-sm-block d-lg-none">
                                    {values.map((val, index) => (
                                        <li className="mt-4" key={index}>
                                            <NavLink to={val.to} className="nav-link fw-bold" activeclassname="nav-link active" aria-current="page">
                                            {val.icon}
                                            {val.name}</NavLink>
                                        </li>
                                    ))}
                                    <li className="mt-4" key="item4">
                                        <Link to="" className="nav-link fw-bold" onClick={logout} >
                                        <BiLogInCircle  size={25} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                                            Sign out</Link>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default DashboardMenu;