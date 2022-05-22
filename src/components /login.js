import React from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import '../styles/createAccount.css';
import { Link } from "react-router-dom";

function Login() {
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo}>
                <h4 className="create-header-title">Log in to Padipay </h4>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="additional-info">
                    <p>Already have an account? 
                        <Link to="/account">
                            <span>Sign Up</span>
                        </Link>
                    </p>
                </div>
                <div className="forgot-password">
                    <Link className="link" to="/reset">
                        <p>Forgot Password ?</p>
                    </Link>
                </div>
                <div className="send-btn">
                    <Link to="/dashboard">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Sign in</button>
                    </Link>
                </div>
            </FormContainerLayout>
        </div>
     );
}

export default Login;