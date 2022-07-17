import React from "react";
import verify from '../images/verify.png';
import { Link } from "react-router-dom";
import logo from '../images/Logo.png';
import notfound from '../images/10.png';
import FormContainerLayoutTwo from "./formContainerLayoutTwo";
import Logo from '../images/Logo.png';
import Navbar from "./navbar";

function NotFound() {
    return ( 
        <>
        <Navbar image={logo}/>
        <div className="d-flex align-items-center justify-content-center mt-5 verify">
            <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <img className="" src={notfound} alt="image" />
                </div>
                <div className="col-12">
                <h1>Oops, Page not found!</h1>
                <p>Nobody is here! Are you looking for me?</p>
                <p className="mt-4">Go to <Link to="/" style={{textDecoration: 'none'}}><span>Home Page</span></Link></p>
                </div>
            </div>
        </div>
        </>
     );
}

export default NotFound;