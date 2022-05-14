import React from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import '../styles/createAccount.css';
import { Link } from "react-router-dom";

function CreateAccount() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo}>
                <h4 className="create-header-title">Create Account</h4>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingPassword" placeholder="Username" />
                    <label htmlFor="floatingPassword">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="additional-info">
                    <p>Already have an account? 
                        <Link to="/login">
                            <span>Login</span>
                        </Link>
                    </p>
                </div>
                <div className="send-btn">
                    <Link to="/verify">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Next</button>
                    </Link>
                </div>
            </FormContainerLayout>
        </div>
    );
}

export default CreateAccount;