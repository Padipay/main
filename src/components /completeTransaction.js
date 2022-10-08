import React, { useEffect, useState } from "react";
import uniqid from 'uniqid';
import Stepper from "./stepper";
import '../styles/completeTransaction.css';
import PaymentDetails from "./paymentDetails";
import Header from "./header";
import FormContainer from "./formContainerLayout";
import { saveTransaction } from "../api/api";
import firebase from '../firebase/firebase'
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { paymentOrder } from "../api/binancepay";
import { LargeSpinner } from "../styles/globalStyles";

import { paymentStatus, binancePay, fetchError, paymentTimestamp } from "../redux/transfer/actions/actions";
import { useDispatch, useSelector } from "react-redux";


const Error = styled.p`
    color: rgb(220, 53, 69);
    font-weight: 600;
    font-size: 13px;
    opacity: 1;
    text-align: left;
    margin-left: 43px
`

const StyledSpinnerSpan = styled.span`
    position: absolute;
    margin-left: inherit;
    margin-top: 0px;
`

function CompleteTransaction() {
    const dispatch = useDispatch();
    const { transfer, recepient, payment } = useSelector(state => state.transfer_details)
    const [loading, setLoading] = useState(false)

    const { register, formState: { errors }, handleSubmit } = useForm();

    const {tokenValue, sendAmount, receiveAmount} = transfer;
    const {accountNumber, accountName, bankName, purpose} = recepient
    const[userId, setuserId] = useState('');
    
    // const [open, setOpen] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
                setuserId(user.uid)
            }
        })
    }, [])

    const createPayment = async () => {
        setLoading(true)
        if (tokenValue === 'BUSD' || tokenValue === 'USDT') {
            await paymentOrder(sendAmount, tokenValue)
                .then((res) => {
                    dispatch(binancePay(res.data.data))
                    setLoading(false)
                    dispatch(paymentStatus())
                }).catch((err) => fetchError(err.message))
        }else {
            setLoading(false)
            dispatch(paymentStatus())
        }
    }

    const onSubmit = () => {
        // saveTransaction(userId, receiveAmount, sendAmount, tokenValue, bankName, accountName, accountNumber)
        // setOpen(true)
        // createPayment()      
        const date = new Date();
        const timestamp = date.getTime()
        const exipryTime = timestamp + (20 * 60 * 1000)

        const data = {
            timestamp,
            exipryTime
        }
        dispatch(paymentStatus())
        dispatch(paymentTimestamp(data))
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
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading === true}>{`Pay ${sendAmount} ${tokenValue}`}
                              <StyledSpinnerSpan>{loading && <LargeSpinner name="three-bounce" color="white" />} </StyledSpinnerSpan>
                            </button>
                        </div>
                    </form>
                </FormContainer>
            </div>
        </>
     );
}

export default CompleteTransaction;