import React from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import verify from '../images/verify.png';
import '../styles/verify.css';
import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';


function VerifyAccount() {
    const location = useLocation();

    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100 verify">
            <FormContainerLayout image={Logo} type="account">
                <img className="image-verify" src={verify} alt="logo" />
                <h4>Verify your account</h4>
                <p>We’ve sent an email to</p>
                <p className="text-decoration-underline fw-bold">{location.state.email}</p>
                <p>Click the email link to verify your account.</p>
                <div className="send-btn">
                    <Link className="link" to="/login">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Next</button>
                    </Link>
                </div>
            </FormContainerLayout>
        </div>
    );
}

export default VerifyAccount;