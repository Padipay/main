import React, { useContext, useState } from "react";
import Stepper from "./stepper";
import '../styles/completeTransaction.css';
import PaymentDetails from "./paymentDetails";
import Header from "./header";
import FormTitle from "./formTitle";
import FormContainer from "./formContainerLayout";
import { saveTransaction } from "../api/api";

function CompleteTransaction() {
    const {tokenValue, sendAmount, receiveAmount} = JSON.parse(sessionStorage.getItem("transferDetails"));
    const {accountNumber, accountName, bankName} = JSON.parse(sessionStorage.getItem("recepientDetails"));
    
    const [open, setOpen] = useState('');
    const onSubmit = () => {
       saveTransaction(receiveAmount, sendAmount, tokenValue, bankName, accountName, accountNumber)
        // send: sendAmount,
        // token: tokenValue,
        // bankName: bankName,
        // account_name: accountName,
        // account_number:accountNumber,
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
                    <div className="continue-btn mb-5">
                        <button type="button" onClick={onSubmit} className="btn btn-primary btn-lg">{`Pay ${sendAmount} ${tokenValue}`}</button>
                    </div>
                    <PaymentDetails open={open}/> 
                </FormContainer>
            </div>
        </>
     );
}

export default CompleteTransaction;