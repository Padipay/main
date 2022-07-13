import React, { useContext, useState } from "react";
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

const StyledFormContainerLayout = styled(FormContainerLayout).attrs(() => ({
    className: 'col-lg-9 col-sm-10'
  }))`

`

const schema  = yup.object({
    email: yup.string()
    .email("Enter recepient email")
    .required("Please enter a valid email"),

    phone_number: yup.string()
    .required("Please enter a valid phone number")
    .min(9, 'Enter a valid phone number'),

    accountNum: yup.number("Account Number cannot be empty")
    .required("Account Number cannot be empty")
    .typeError("Account Number cannot be empty"),

    bankName: yup.string()
    .required("Select a bank name")
}).required();

function RecepientDetails() {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [page, setPage ] = useState(1);
    const [accountNumber, setAccountNumber] = useState('')
    const [recepientEmail, setRecepientEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [bankCode, setBankCode ] = useState('')
    const [accountName, setAccountName ] = useState(null)
    const [bankName, setBankName ] = useState(null)

    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState(null);
    const [visible, setVisible ] = useState(false);

    const navigate = useNavigate();

    const bank_name = bankCodes.map((bank) => {
        return <option value={bank.code} key={bank.code}>{bank.name}</option>
    })
    const bankVerification = async () => {
        setLoading(true)
        setError(null)
        const options = {method: 'GET', headers: {Accept: 'application/json', 'Authorization': `Bearer sk_test_0fcdfe09b39f447af1a951fe4dd87f85b9874ad6`}};

        await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, options)
        .then(response => response.json())
        .then(response => {
            if (response.status === true) {
                setAccountName(response.data.account_name)
                setBankName(bankName)

                setVisible(true)
                setLoading(false)
            }else{
               setError("Could not verify account details. Check details and try again.")
               setLoading(false)
            }
        }).catch(err => console.log(err));
    };
    
    const onSubmit = () => {
        bankVerification()
    };
    const handleContinue = () => {
        const recepientDetails = {
            accountName: accountName,
            accountNumber: accountNumber,
            bankName: bankName,
            email: recepientEmail,
            phoneNumber: phoneNumber
        };
        sessionStorage.setItem("recepientDetails", JSON.stringify(recepientDetails));
        navigate("/review")
    }
    return (
        <>
            <Header />
            <div className="row main-content">
                <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
                    <Stepper page_num={page}/>
                </div>
                <StyledFormContainerLayout title="Who are you sending to?">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-border">
                            <label className="label-send">Recepient Email</label>
                            <input 
                            {...register("email")}
                            type="email" 
                            className="input-field" 
                            placeholder="maria.yahaya@outlook.com"
                            onChange={(e) => setRecepientEmail(e.target.value)}/> 
                        </div>
                        {<p className="errors">{errors.email?.message}</p>}
                        {/* <div className="input-border">
                            <label className="label-send">Phone Number</label>
                            <input 
                            {...register("phone_number")}
                            type="text" 
                            className="input-field" 
                            placeholder="🇳🇬 +234043504305"
                            onChange={(e) => setPhoneNumber(e.target.value)}/> 
                        </div> */}
                            <Controller 
                            name="phone_number"
                            control={control}
                            render={({field, field: { onChange, value } }) => (
                                <PhoneInput
                                country={'ng'}
                                inputStyle={{width:400, borderRadius: 12, height:67}}
                                containerStyle={{marginLeft: 32}}
                                onChange={(phone) => {
                                    setPhoneNumber(phone)
                                    onChange(phone)
                                }}
                                />
                            )}
                            />
                        {<p className="errors">{errors.phone_number?.message}</p>}
                        <div className="input-border">
                            <select 
                            {...register("bankName")}
                            className="select-bank mt-4 ms-2 mb-3"
                            onChange={
                                (e) => {
                                    setBankCode(e.target.value) 
                                    setBankName(e.target.selectedOptions[0].text)}}
                            defaultValue={'Select bank name'} 
                            >
                                <option value="Select bank name" disabled>
                                    Select bank name
                                </option>
                                {bank_name}
                            </select>
                            {/* <input type="text" className="input-field" placeholder="maria.yahaya@outlook.com"/>  */}
                            {<p className="errors ms-3 mt-3">{errors.bankName?.message}</p>}
                        </div>
                        <div className="input-border mt-4">
                            <label className="label-send">Account Number</label>
                            <input 
                            {...register("accountNum")}
                            type="text" 
                            className="input-field" placeholder="00232003020"
                            onChange={(e) => {
                                setAccountNumber(e.target.value)
                            }}
                            /> 
                        </div>
                        {<p className="errors ">{errors.accountNum?.message}</p>}
                        {error != null ? <p className="errors ">{error}</p> : null}
                        <div className="recipient-seperator mb-4"></div>
                        {visible &&
                        <div className="border-account-name">
                            <label className="label-send">Account Name</label>
                            <p>{accountName}</p>
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
        </>
    );
}

export default RecepientDetails;