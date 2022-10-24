import React from "react";
import FormContainerLayoutTwo from "../Layouts/formContainerLayoutTwo";
import Logo from '../../images/Logo.png';
import verify from '../../images/verify.png';
import '../../styles/authentication/verify.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



function VerifyAccount() {
    const {auth_user } = useSelector(state => state.auth_details)

    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100 verify">
            <FormContainerLayoutTwo image={Logo} type="account">
                <img className="image-verify" src={verify} alt="logo" />
                <h4>Verify your account</h4>
                <p>We’ve sent an email to</p>
                <p className="text-decoration-underline fw-bold">{auth_user.Email}</p>
                <p>Click the email link to verify your account.</p>
                <div className="send-btn">
                    <Link className="link" to="/login">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Next</button>
                    </Link>
                </div>
            </FormContainerLayoutTwo>
        </div>
    );
}

export default VerifyAccount;