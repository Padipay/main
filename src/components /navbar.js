import React from "react";
import '../styles/navbar.css';
import logo from '../images/Logo3.png';
import { Link } from "react-router-dom";

function Navbar() {
    const userId = sessionStorage.getItem("userId")
    return (
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
                        <Link to="/register">
                            <button className="btn btn-primary get-started">Get started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;