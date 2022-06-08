import React from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import { Link } from "react-router-dom";

function NewPassword() {
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo}>
                <h4 className="create-header-title">Create new password</h4>
                <div className="form-floating mb-3 me-4 ms-4">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3 me-4 ms-4">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="New password" />
                    <label htmlFor="floatingPassword">New Password</label>
                </div>
                <div className="form-floating mb-3 me-4 ms-4">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Confirm new password" />
                    <label htmlFor="floatingPassword">Confirm new password</label>
                </div>
                <div className="send-btn">
                    <Link to="/">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Update Password</button>
                    </Link>
                </div>
            </FormContainerLayout>
        </div>
     );
}

export default NewPassword;