import React from "react";
import FormContainerLayoutTwo from '../components /formContainerLayoutTwo'
import Logo from '../images/Logo.png';
import '../styles/resetPassword.css';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router";

const ResetInfo = styled.p `
    margin-left: 30px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    width: 80%;
`

function SuccessfulTransaction() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/')
        sessionStorage.clear()
    }
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayoutTwo image={Logo} type="account">
                <h4 className="create-header-title">Transaction Successful 🎊</h4>
                <ResetInfo>Your transaction was successful. Please check your recepient account for confirmation</ResetInfo>
                <ResetInfo>If you don't receive the money within five minutes please contact support padipay@support.io</ResetInfo>
                <div className="send-btn">
                    <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3" onClick={handleClick}>Back to home</button>  
                </div>
            </FormContainerLayoutTwo>
        </div>
     );
}

export default SuccessfulTransaction;