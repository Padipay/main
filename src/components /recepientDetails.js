import React, { useContext, useState } from "react";
import '../index.css';
import '../styles/recepientDetails.css';
import Stepper from "./stepper";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {bankCodes} from '../data/data.js';
import FormContainerLayout from "./formContainerLayout";
import { TransferContext } from "../contextApi/TransferContext";

const schema  = yup.object({
    email: yup.string()
    .email("Enter recepient email")
    .required("Please enter a valid email"),
    accountNum: yup.number("Account Number cannot be empty")
    .required("Account Number cannot be empty")
    .typeError("Account Number cannot be empty"),
    bankName: yup.string()
    .required("Select a bank name")
}).required();

function RecepientDetails() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [page, setPage ] = useState(1);
    const [accountNumber, setAccountNumber] = useState('')
    const [bankCode, setBankCode ] = useState('')
    const [accountName, setAccountName ] = useState(null)

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
        const options = {method: 'GET', headers: {Accept: 'application/json', 'Authorization': `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`}};

        await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, options)
        .then(response => response.json())
        .then(response => {
            if (response.status === true) {
                setAccountName(response.data.account_name)
                setRecepientName(response.data.account_name)

                setVisible(true)
                setLoading(false)
            }else{
               setError("Could not verify account details. Check details and try again.")
               setLoading(false)
            }
        }).catch(err => console.log(err));
    };
    
    const {setRecepientName, setRecepientAccNum } = useContext(TransferContext);

    const onSubmit = data => {
        // console.log(accountName)
        // console.log(error)
        bankVerification()
    };

    const handleContinue = () => {
        const recepientDetails = {
            accountName: accountName,
            accountNumber: accountNumber
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
                <FormContainerLayout title="Who are you sending to?">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-border">
                            <label className="label-send">Recepient Email</label>
                            <input 
                            {...register("email")}
                            type="email" 
                            className="input-field" 
                            placeholder="maria.yahaya@outlook.com"/> 
                        </div>
                        {<p className="errors">{errors.email?.message}</p>}
                        <div className="input-border">
                            <select 
                            {...register("bankName")}
                            className="select-bank mt-4 ms-2 mb-3"
                            onChange={(e) => setBankCode(e.target.value)}
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
                                setRecepientAccNum(e.target.value)
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
                </FormContainerLayout>
            </div>
        </>
    );
}

export default RecepientDetails;