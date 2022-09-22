import React, { useState } from "react";
import '../index.css';
import '../styles/recepientDetails.css';
import Stepper from "./stepper";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {bankCodes} from '../data/data.js';
import FormContainerLayout from "./formContainerLayout";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import styled from "styled-components";

import { recepientDetails } from "../redux/transfer/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { bankVerify } from "../api/api";


const StyledFormContainerLayout = styled(FormContainerLayout).attrs(() => ({
    className: 'col-lg-9 col-sm-10'
  }))`

`

const schema  = yup.object({
    email: yup.string()
    .email("Enter recepient email")
    .required("Please enter a valid email"),

    phone_number: yup.string()
    // .required("Please enter a valid phone number")
    .min(9, 'Enter a valid phone number'),

    purpose: yup.string()
    .required("Purpose field is required"),

    accountNum: yup.number("Account Number cannot be empty")
    .required("Account Number cannot be empty")
    .typeError("Account Number cannot be empty"),

    bankName: yup.string()
    .required("Select a bank name")
}).required();

function RecepientDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {recepient} = useSelector(state => state.transfer_details)

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: recepient.email,
            purpose: recepient.purpose
        },
        resolver: yupResolver(schema),
        mode: "all",
    });
    const [page, setPage ] = useState(1);
    const [accountNumber, setAccountNumber] = useState(recepient.accountNumber)
    const [recepientEmail, setRecepientEmail] = useState(recepient.email)
    const [purpose, setPurpose] = useState(recepient.purpose)
    const [phoneNumber, setPhoneNumber] = useState(recepient.phoneNumber)
    const [bankCode, setBankCode ] = useState(recepient.bankCode)
    const [accountName, setAccountName ] = useState(null)
    const [bankName, setBankName ] = useState('')

    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState(null);
    const [visible, setVisible ] = useState(false);

    const bank_name = bankCodes.map((bank) => {
        return <option value={bank.code} key={bank.code}>{bank.name}</option>
    })
    const bankVerification = async () => {
        setLoading(true)
        setError(null)

        bankVerify(accountNumber, bankCode)
            .then((res) => {
                setAccountName(res.data.account_name)
                setBankName(bankName)
                setVisible(true)
                setLoading(false)
            }).catch((err) => {
                setError("Could not verify account details. Check details and try again.")
                setLoading(false)
            }); 
    };
    
    const onSubmit = async () => {
        bankVerification()     
    };
    const handleContinue = () => {
        const recepientDetail = {
            accountName: accountName,
            accountNumber: accountNumber,
            bankName: bankName,
            bankCode: bankCode,
            email: recepientEmail,
            phoneNumber: phoneNumber,
            purpose: purpose
        };
        dispatch(recepientDetails(recepientDetail))
        navigate("/review")
    }
    
    return (
        <>
            <Header />
            <div className="container-fluid">
            <div className="row main-content">
                <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
                    <Stepper page_num={page}/>
                </div>
                <StyledFormContainerLayout title="Who are you sending to?">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-border-recipient">
                            <label className="label-send">Recepient Email</label>
                            <input 
                            {...register("email")}
                            type="email" 
                            className="input-field" 
                            placeholder="maria.yahaya@outlook.com"
                            onChange={(e) => setRecepientEmail(e.target.value)}/> 
                        </div>
                        {<p className="errors">{errors.email?.message}</p>}
                            <Controller 
                            name="phone_number"
                            control={control}
                            render={({field, field: { onChange, value } }) => (
                                <PhoneInput
                                country={'ng'}
                                inputStyle={{borderRadius: 12, width:'92%', height:67}}
                                inputClass={"input-phone"}
                                containerClass= "phone-container"
                                value={phoneNumber}
                                onChange={(phone) => {
                                    setPhoneNumber(phone)
                                    onChange(phone)
                                }}
                                />
                            )}
                            />
                        {<p className="errors">{errors.phone_number?.message}</p>}
                        <div className="input-border-recipient">
                            <label className="label-send">Purpose of transfer</label>
                            <input 
                            {...register("purpose")}
                            type="text" 
                            className="input-field" 
                            placeholder="School fees"
                            onChange={(e) => setPurpose(e.target.value)}/> 
                        </div>
                        {<p className="errors">{errors.purpose?.message}</p>}
                        <div className="input-border-recipient">
                            <select 
                            {...register("bankName")}
                            className="select-bank mt-4 ms-2 mb-3"
                            value={bankCode}
                            onChange={
                                (e) => {
                                    setBankCode(e.target.value) 
                                    setBankName(e.target.selectedOptions[0].text)}}
                            >
                                <option value="1" disabled>Select bank name</option>
                                {bank_name}
                            </select>
                            {/* <input type="text" className="input-field" placeholder="maria.yahaya@outlook.com"/>  */}
                            {<p className="errors ms-3 mt-3">{errors.bankName?.message}</p>}
                        </div>
                        <div className="input-border-recipient mt-4">
                            <label className="label-send">Account Number</label>
                            <input 
                            {...register("accountNum")}
                            type="text" 
                            className="input-field" placeholder="00232003020"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            /> 
                        </div>
                        {<p className="errors ">{errors.accountNum?.message}</p>}
                        {error != null ? <p className="errors ">{error}</p> : null}
                        <div className="recipient-seperator mb-4"></div>
                        {visible &&
                        <div className="border-account-name">
                            <label className="label-send">Account Name</label>
                            <p>{accountName.length < 40 ? accountName : `${accountName.substring(0, 40)}...`}</p>
                        </div> }
                        {accountName === null &&
                        <div className="send-btn">
                            <button type="submit" className="btn btn-primary btn-lg mb-5">Next
                            {loading && <div className="loader"></div>}
                            </button>
                        </div>}
                        {accountName != null &&
                        <div className="send-btn">
                            <button type="button" className="btn btn-primary btn-lg mb-5" onClick={handleContinue}>Continue</button>
                        </div>}
                    </form>
                   
                </StyledFormContainerLayout>
            </div>
            </div>
        </>
    );
}

export default RecepientDetails;