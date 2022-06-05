import React from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import verify from '../images/verify.png';
import '../styles/verify.css';
import { Link } from "react-router-dom";


function VerifyEmail() {
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100 verify">
            <FormContainerLayout image={Logo}>
                <img className="image-verify" src={verify} alt="image" />
                <h4>Verified</h4>
                <p>Thank you for verifying your email address.</p>
                <p>Click the continue button below to login to your account.</p>
                <div className="send-btn">
                    <Link className="link" to="/login">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Continue</button>
                    </Link>
                </div>
            </FormContainerLayout>
        </div>
    );
}

export default VerifyEmail;