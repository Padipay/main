import React from "react";
import '../styles/Header.css'
import logo from '../images/Logo.png';
import { Link } from "react-router-dom";

function Header() {
    const userId = sessionStorage.getItem("userId")
    return ( 
        <>
            <div className="d-none d-sm-block">
                <div className="row header-nav">
                    <div className="col-lg-2 col-sm-4">
                        <Link to="/">
                            <img src={logo} alt="" className="logo" />
                        </Link>
                    </div>
                    <div className="col-lg-5 col-sm-3 info">
                        <h4 className="nav-info">Funds Transfer</h4>
                        <p className="nav-info-2">This should take approximately 3 mins.</p>
                    </div>
                    <div className="col-lg-5 col-sm-4 create-btn d-flex justify-content-around">
                        <Link to={userId != null ? "/dashboard" : "/account"}>
                            <button type="button" className="btn btn-outline-primary">{userId != null ? 'Go to Dasboard' : 'Create an Account'}</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="d-lg-none d-md-none d-sm-none second-nav">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                        <button className="fancy-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ms-auto mt-4">
                            <Link to={userId != null ? "/dashboard" : "/account"}>
                            <   button type="button" className="btn btn-outline-primary">{userId != null ? 'Go to Dasboard' : 'Create an Account'}</button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
     );
}

export default Header;