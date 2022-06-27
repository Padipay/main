import React from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import '../styles/resetPassword.css';
import { Link } from "react-router-dom";

function ResetPassword() {
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo} type="account">
                <h4 className="create-header-title">Reset Password</h4>
                <p className="reset-info">Please enter the email associated with your account to reset your password.</p>
                <div className="form-floating mb-3 me-4 ms-4">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="send-btn">
                    <Link to="/resetpassword">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Send Reset link</button>
                    </Link>
                </div>
            </FormContainerLayout>
        </div>
     );
}

export default ResetPassword;