import React, { useEffect, useState } from "react";
import '../../styles/Layouts/navbar.css';
import { Link } from "react-router-dom";
import HamburgerMenu from "./hamburgerMenu";
import { useNavigate } from "react-router";
import { toggleLoading } from "../../redux/transfer/actions/actions";
import { useDispatch } from "react-redux";

function Navbar({image}) {
    const navigate = useNavigate();
    const dispatch  = useDispatch()
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
                <Link to="/" onClick={() => dispatch(toggleLoading())}>
                    <img src={image} alt="logo" />
                </Link>
                <button className="fancy-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <HamburgerMenu />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto mt-4">
                        {!userId && 
                        
                            <button className="btn btn-primary auth-btn" onClick={() => navigate('/register')}>Sign Up</button>
                        }
                        <button className="btn btn-primary auth-btn" onClick={handleClick}>{userId !== true ? 'Login' : 'Dashboard'}</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;