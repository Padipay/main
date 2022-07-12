import React, { useState } from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import '../styles/resetPassword.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { sendVerificationEmail } from "../api/sendEmail";


function ResendVerificationEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const handleResend = () => {
        sendVerificationEmail(email)
        navigate('/login')
    }
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo} type="account">
                <form onSubmit={handleResend}>
                    <h4 className="create-header-title">Resend Verfication Email</h4>
                    <p className="reset-info">Please enter the email associated with your account.</p>
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="send-btn">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Verify Email</button>
                    </div>
                </form>
            </FormContainerLayout>
        </div>
     );
}

export default ResendVerificationEmail;