import React, { useEffect, useState } from "react";
import '../styles/navbar.css';
import logo from '../images/10.png';
import { Link } from "react-router-dom";
import HamburgerMenu from "./hamburgerMenu";
import firebase from '../firebase/firebase';
import { useNavigate } from "react-router";

function Navbar({image}) {
    const navigate = useNavigate();
    const[userId, setuserId] = useState(false);

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('Auth-Token')
        if (isAuthenticated) {
            setuserId(true)
        }
    }, [])
    const handleClick = async () => {
        const isAuthenticated = sessionStorage.getItem('Auth-Token')
        if (isAuthenticated) {
            navigate('/dashboard')
        }else{
            navigate('/login')
        }
    }
    return (
        <nav className="navbar navbar-expand-lg home-nav">
            <div className="container-fluid">
                <Link to="/">
                    <img src={image} alt="logo" />
                </Link>
                <button className="fancy-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <HamburgerMenu />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto mt-4">
                        <button className="btn btn-primary get-started" onClick={handleClick}>{userId != true ? 'Get Started' : 'Dashboard'}</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;