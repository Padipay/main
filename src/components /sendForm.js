import React, { useContext, useEffect, useState } from "react";
import { MdSwapVert } from "react-icons/md";
import '../styles/homepage.css';
import btc from '../images/bitcoin-btc-logo.png';
import eth from '../images/ethereum-eth-logo.png';
import usdt from '../images/tether-usdt-logo.png';
import nig from '../images/nigeria.png';

import busd from '../images/binance-usd-busd-logo.png';
import tron from '../images/tron-trx-logo.png';
import trc20 from '../images/tether.png'

import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TransferContext } from "../contextApi/TransferContext";
import firebase from '../firebase/firebase';
import NumberFormat from 'react-number-format';
import styled from "styled-components";

const StyledSelect = styled.select `
    border: none;
    outline: none;
    font-size: 1.1rem;
    font-weight: bold;
    position: absolute;
    margin-top: -9px;
    background-color: white;
    margin-left: 25px;
`

const StyledSelectTwo = styled(StyledSelect)`
    padding-right: 13px
`


const schema  = yup.object({
    receive: yup.string("Enter an amount to receive")
    .required("Please enter an amount receive")
    .typeError("Please enter an amount receive")
    .test("receive amount", "Minimum amount to send is 500.00 NGN", (val) => {
        return String(val).replace(/,/g, '') >= 500
    })
    .test("receive amount", "Maximum amount to send is 2,000,000 NGN", (val) => {
        return String(val).replace(/,/g, '') <= 2000000
    }),
    send: yup.string("Enter an amount to send")
    .required("Please enter an amount send")
    .typeError("Please enter an amount send")
}).required();

function SendForm({type, labelOne, labelTwo}) {
    const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });
    const [token, setToken ] = useState('BUSD');
    const [country, setCountry ] = useState('NGN');
    const [receiveAmount, setReceive ] = useState('');
    const [sendAmount, setSend ] = useState('');
    const [switchInputs, setSwitchInputs ] = useState(false);

    const [conversionRates, setConversionRates] = useState({
        BTC: 0,
        USDT: 0,
        ETH: 0
    })

    const navigate = useNavigate();

    const handleToken = (e) => {
        setToken(e.target.value);
    };
    const handleCountry = (e) => {
        setCountry(e.target.value);
    };
    
    const handleReceive = (value) => {
        setReceive(value)
        // if(value) {
        //     if (token === 'BTC') {
        //         setValue("send", value / conversionRates.BTC)
        //     }else if (token === 'USDT') {
        //         setValue("send", value / conversionRates.USDT)
        //     }else {
        //         setValue("send", value / conversionRates.ETH)
        //     }
        // }else {
        //     setValue("send", '')
        //     setValue("receive", '')
        // }
    };
    const handleSend = (value) => {
        setSend(value)
        // if(value) {
        //     if (token === 'BTC') {
        //         setValue("receive", value * conversionRates.BTC)
        //     }else if (token === 'USDT') {
        //         setValue("receive", value * conversionRates.USDT)
        //     }else{
        //         setValue("receive", value * conversionRates.ETH)
        //     }
        // }else {
        //     setValue("send", '')
        //     setValue("receive", '')
        // }
    };
    const handleSwitch = () => {
        setSwitchInputs(() => !switchInputs)
    };    
    const onSubmit = () => {
        console.log("data")
        navigate("/details")
        const transferDetails = {
            sendAmount: sendAmount, 
            receiveAmount: receiveAmount,
            tokenValue: token
        }
        sessionStorage.setItem("transferDetails", JSON.stringify(transferDetails))
    };
    useEffect(() => {
        const rates = firebase.firestore().collection("conversion").doc("conversion-rates");
        rates.get().then((doc) => {
            if (doc.exists) {
                setConversionRates(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [])
    const {setSendAmount, setReceiveAmount, setTokenValue } = useContext(TransferContext);
    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="switch" onClick={handleSwitch}>
                <MdSwapVert 
                size={20} 
                style={{fill: 'white', marginLeft: 10, marginTop: 10}}
                />
            </div>
            <div className="row homepage">
                {switchInputs !== true ?
                <div>
                    <div className="input-border">
                        <label className="label-send">{labelOne}</label>
                        <Controller 
                            name="send"
                            control={control}
                            render={({field, field: { onChange, value } }) => (
                                <NumberFormat
                                thousandSeparator={true}
                                className="input-amount"
                                inputMode="numeric"
                                placeholder="0.0001"
                                decimalScale={7}
                                onValueChange={(values) => {
                                    const {value} = values;
                                    onChange(value)
                                    handleSend(value)
                                }}
                                value={value}
                                {...field}
                                />
                            )}
                        />
                        <StyledSelect
                            {...register("token")}
                            // defaultValue="BTC"
                            name="token" id="tokens" 
                            onChange={handleToken}>

                            <option value="BUSD" >BUSD</option>
                            <option value="TRC20" >TRC20</option>
                            <option value="TRON" >TRON</option>

                            <option value="BTC" disabled>BTC</option>
                            <option value="USDT" disabled>USDT</option>
                            <option value="ETH" disabled>ETH</option>
                            </StyledSelect>
                        {token === 'BUSD' && <img src={busd} alt="btc" className="select-token-image"/>}
                        {token === 'TRC20' && <img src={trc20} alt="trc20" className="select-token-image"/>}
                        {token === 'TRON' && <img src={tron} alt="tron" className="select-token-image"/>}
                    </div>
                    { errors.send && <p className="errors mt-4">{errors.send?.message}</p>}
                </div> 
                : 
                <div>
                    <div className="input-border">
                        <label className="label-send">{labelTwo}</label>
                        <Controller 
                            render={({field, field: { onChange, value } }) => (
                                <NumberFormat
                                thousandSeparator={true}
                                className="input-amount"
                                inputMode="numeric"
                                placeholder="500"
                                // decimalScale={7}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    onChange(value)
                                    handleReceive(value)
                                }}
                                value={value}
                                {...field}
                                />
                            )}
                            name="receive"
                            control={control}
                        />
                        <StyledSelectTwo
                        {...register("fiat")}
                        defaultValue="NGN"
                        name="token" id="fiat" 
                        onChange={handleCountry}>
                            <option value="ngn">NGN</option>
                        </StyledSelectTwo>
                        {country === 'NGN' && <img src={nig} alt="btc" className="select-token-image"/>}
                    </div>
                    {errors.receive && <p className="errors mt-4">{errors.receive?.message}</p>}
                </div>

                }

                {switchInputs !== true ?
                <div>
                    <div className="input-border">
                        <label className="label-send">{labelTwo}</label>
                        <Controller 
                            render={({field, field: { onChange, value } }) => (
                                <NumberFormat
                                thousandSeparator={true}
                                className="input-amount"
                                inputMode="numeric"
                                placeholder="500"
                                // decimalScale={7}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    onChange(value)
                                    handleReceive(value)
                                }}
                                value={value}
                                {...field}
                                />
                            )}
                            name="receive"
                            control={control}
                        />
                        <StyledSelectTwo
                        {...register("fiat")}
                        defaultValue="NGN"
                        name="token" id="fiat" 
                        onChange={handleCountry}>
                        
                            <option value="ngn">NGN</option>
                        </StyledSelectTwo>
                        {country === 'NGN' && <img src={nig} alt="btc" className="select-token-image"/>}
                    </div>
                    {errors.receive && <p className="errors mt-4">{errors.receive?.message}</p>}
                </div>
                : 
                <div>
                    <div className="input-border">
                        <label className="label-send">{labelOne}</label>
                        <Controller 
                            name="send"
                            control={control}
                            render={({field, field: { onChange, value } }) => (
                                <NumberFormat
                                thousandSeparator={true}
                                className="input-amount"
                                inputMode="numeric"
                                placeholder="0.0001"
                                decimalScale={7}
                                onValueChange={(values) => {
                                    const {value} = values;
                                    onChange(value)
                                    handleSend(value)
                                }}
                                value={value}
                                {...field}
                                />
                            )}
                        />
                        <StyledSelect
                            {...register("token")}
                            // defaultValue="BTC"
                            name="token" id="tokens" 
                            onChange={handleToken}>

                            <option value="BUSD" >BUSD</option>
                            <option value="TRC20" >TRC20</option>
                            <option value="TRON" >TRON</option>

                            <option value="BTC" disabled>BTC</option>
                            <option value="USDT" disabled>USDT</option>
                            <option value="ETH" disabled>ETH</option>
                        </StyledSelect>
                        {token === 'BUSD' && <img src={busd} alt="btc" className="select-token-image"/>}
                        {token === 'TRC20' && <img src={trc20} alt="trc20" className="select-token-image"/>}
                        {token === 'TRON' && <img src={tron} alt="tron" className="select-token-image"/>}
                    </div>
                    { errors.send && <p className="errors mt-4">{errors.send?.message}</p>}
                </div> 
                }
                <div className="conversion">
                    {token === 'BTC' ? <p>{` 1 ${token} = ${conversionRates.BTC.toLocaleString()}`}</p> : token === 'USDT' ? <p>{` 1 ${token} = ${conversionRates.USDT.toLocaleString()}`}</p> : <p>{` 1 ${token} = ${conversionRates.ETH.toLocaleString()}`}</p>}
                </div>
                <div className="homepage-seperator"></div>
                {type === 'transfer' ? 
                <div className="input-border">
                    <label className="label-send">Destination</label>
                    <select name="destination" id="" className="select-destination" onChange={handleCountry}>
                        <option value="NGN">NGN</option>
                    </select>
                    <img src={nig} alt="ngn" className="select-country-image"/>
                </div> : null }
                <div className="col text-center homepage-send-btn mb-4">
                    <button type="submit" className="btn btn-primary btn-lg">Continue</button>
                </div>
            </div>
        </form>
     );
}

export default SendForm;