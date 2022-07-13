import React, { useEffect, useState } from "react";
import Stepper from "./stepper";
import '../styles/completeTransaction.css';
import PaymentDetails from "./paymentDetails";
import Header from "./header";
import FormContainer from "./formContainerLayout";
import { saveTransaction } from "../api/api";
import firebase from '../firebase/firebase'
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Error = styled.p`
    color: rgb(220, 53, 69);
    font-weight: 600;
    font-size: 13px;
    opacity: 1;
    text-align: left;
    margin-left: 43px
`

function CompleteTransaction() {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const {tokenValue, sendAmount, receiveAmount} = JSON.parse(sessionStorage.getItem("transferDetails"));
    const {accountNumber, accountName, bankName} = JSON.parse(sessionStorage.getItem("recepientDetails"));
    const[userId, setuserId] = useState('');
    
    const [open, setOpen] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
                setuserId(user.uid)
            }
        })
    }, [])
    const onSubmit = () => {
        saveTransaction(receiveAmount, sendAmount, tokenValue, bankName, accountName, accountNumber)
        // if (userId != '') {
        //     saveTransaction(userId,receiveAmount, sendAmount, tokenValue, bankName, accountName, accountNumber)
        // }else {
        //     saveTransaction(receiveAmount, sendAmount, tokenValue, bankName, accountName, accountNumber)
        // }
       setOpen(true)
      
    }
    const [page, setPage ] = useState(3)
    return ( 
        <>
        <Header />
            <div className="row main-content">
                <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
                    <Stepper page_num={page}/>
                </div>
                <FormContainer title="Complete your transaction">
                    <div className="review-heading">
                        <p className="main-heading">Follow these steps</p>
                    </div>
                    <div className="seperator"></div>
                    <div className="steps-details mt-3">
                        <p>1. Copy the crypto address and paste into your wallet or exchange, or just scan the QR code.</p>
                    </div>
                    <div className="steps-details">
                        <p>2. Depending on your wallet app, amount may be filled automatically if QR code is scanned. If not, copy and paste the amount.</p>
                    </div>
                    <div className="steps-details">
                        <p>3. Send Crypto and wait for your transaction to be completed.</p>
                    </div>
                    <div className="steps-details">
                        <p>4. By checking the terms and conditions bx you agree to all the legal terms and conditions are prescribed by padipay.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="steps-details">
                                <div className="form-check">
                                    <input {...register("tandc", { required: true })} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label " htmlFor="flexCheckDefault">
                                    <strong>Accept Terms and Conditions</strong>
                                    </label>
                                </div>
                            </div>
                            {errors.tandc && <Error>Please accept the terms and conditions.</Error>}
                        <div className="steps-details mt-2">
                            <a href="/">Terms and Conditions</a>
                        </div>
                        <div className="continue-btn mb-5">
                            <button type="submit" className="btn btn-primary btn-lg">{`Pay ${sendAmount} ${tokenValue}`}</button>
                        </div>
                    </form>
                    <PaymentDetails open={open}/> 
                </FormContainer>
            </div>
        </>
     );
}

export default CompleteTransaction;