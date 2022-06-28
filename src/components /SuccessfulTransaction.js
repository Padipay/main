import React from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import '../styles/resetPassword.css';
import { Link } from "react-router-dom";
import styled from "styled-components";

const ResetInfo = styled.p `
    margin-left: 30px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    width: 80%;
`

function SuccessfulTransaction() {
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo} type="account">
                <h4 className="create-header-title">Transaction Successful 🎊</h4>
                <ResetInfo>Your transaction was successful. Please check your recepient account for confirmation</ResetInfo>
                <ResetInfo>If you don't receive the money within five minutes please contact support padipay@support.io</ResetInfo>
                <div className="send-btn">
                    <Link to="/">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Back to home</button>
                    </Link>
                </div>
            </FormContainerLayout>
        </div>
     );
}

export default SuccessfulTransaction;