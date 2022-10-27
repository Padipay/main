import React, { useEffect } from "react";
import FormContainerLayoutTwo from "../Layouts/formContainerLayoutTwo";
import Logo from '../../images/Logo.png';
import '../../styles/authentication/resetPassword.css';
import styled from "styled-components";
import { useNavigate } from "react-router";
import { paymentStatus } from "../../redux/transfer/actions/actions";
import { useDispatch } from "react-redux";

const ResetInfo = styled.p `
    margin-left: 30px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    width: 80%;
`

function SuccessfulTransaction() {
    // const[userId, setuserId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(paymentStatus())
    },[])

    const handleClick = async () => {
        const isAuthenticated = await sessionStorage.getItem('Auth-Token')
        if (isAuthenticated) {
            navigate('/dashboard')
           }else{
            window.location.reload()
           }
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