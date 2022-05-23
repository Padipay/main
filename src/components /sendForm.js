import React, { createContext, useContext, useEffect, useState } from "react";
import { MdSwapVert } from "react-icons/md";
import '../styles/homepage.css';
import btc from '../images/bitcoin-btc-logo.png';
import eth from '../images/ethereum-eth-logo.png';
import usdt from '../images/tether-usdt-logo.png';
import nig from '../images/nigeria.png';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TransferContext } from "../contextApi/TransferContext";
import firebase from '../firebase/firebase';
import NumberFormat from 'react-number-format';

const schema  = yup.object({
    receive: yup.string("Enter an amount to receive")
    .required("Please enter an amount receive")
    .typeError("Please enter an amount receive")
    .test("receive amount", "Minimum amount to send is 500 NGN", (val) => {
        return String(val).replace(/,/g, '') >= 500
    }),
    send: yup.string("Enter an amount to send")
    .required("Please enter an amount send")
    .typeError("Please enter an amount send")
}).required();

function SendForm({type, labelOne, labelTwo}) {
    const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        // defaultValues: {
        //     send: 0.0001,
        //     receive: 500
        // }
    });
    const [token, setToken ] = useState('BTC');
    const [country, setCountry ] = useState('ngn');
    const [receiveAmount, setReceive ] = useState('');
    const [sendAmount, setSend ] = useState('');
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
        // const { value } = e.target;
        if(value) {
            // const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
            // setReceive(value);
            if (token === 'BTC') {
                // setSend(value / conversionRates.BTC)
                setValue("send", value / conversionRates.BTC)
            }else if (token === 'USDT') {
                // setSend(value / conversionRates.USDT)
                setValue("send", value / conversionRates.USDT)
            }else {
                // setSend(value / conversionRates.ETH)
                setValue("send", value / conversionRates.ETH)
            }
            // setSendAmount(String(receive).replace(/,/g, '') / 10000);
        }else {
            // setReceive('')
            // setSend('')
            setValue("send", '')
            setValue("receive", '')
        }
    };
    const handleSend = (value) => {
        if(value) {
            // const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
            // setSend(value);
            if (token === 'BTC') {
                // const convert = value * conversionRates.BTC
                // setReceive(convert.toLocaleString())
                setValue("receive", value * conversionRates.BTC)
            }else if (token === 'USDT') {
                // const convert = value * conversionRates.USDT
                // setReceive(convert.toLocaleString())
                setValue("receive", value * conversionRates.USDT)
            }else{
                // const convert = value * conversionRates.ETH
                // setReceive(convert.toLocaleString())
                setValue("receive", value * conversionRates.ETH)
            }
        }else {
            // setSend('')
            // setReceive('')
            setValue("send", '')
            setValue("receive", '')
        }
    };
    const handleSwitch = () => {

        const getSendAmount =  getValues("send")
        const getReceiveAmount =  getValues("receive")
    
        // console.log(getReceiveAmount)
        // setValue("send", getReceiveAmount)
        // setValue("receive", getSendAmount) 
    };    
    const onSubmit = () => {
        console.log("data")
        navigate("/details")
        // const transferDetails = {
        //     sendAmount: send, 
        //     receiveAmount: receive,
        //     tokenValue: token
        // }
        // sessionStorage.setItem("transferDetails", JSON.stringify(transferDetails))
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
            <div 
                className="switch"
                onClick={handleSwitch}
            >
                <MdSwapVert 
                    size={20} 
                    style={{fill: 'white', marginLeft: 10, marginTop: 10}}
                />
            </div>
            <div className="row homepage">
                <div className="input-border">
                    <label className="label-send">{labelOne}</label>
                    <Controller 
                        name="send"
                        control={control}
                        render={({field, field: { onChange, onBlur, name, value } }) => (
                            <NumberFormat
                            thousandSeparator={true}
                            className="input-amount"
                            inputMode="numeric"
                            // placeholder="0.0001"
                            onValueChange={(values) => {
                                const {formattedValue, value} = values;
                                onChange(value)
                                handleSend(value)
                            }}
                            value={value}
                            {...field}
                            />
                        )}
                    />
                    <select 
                        {...register("token")}
                        defaultValue="BTC"
                        name="token" id="tokens" 
                        className="select-token" onChange={handleToken}
                    >
                        <option value="BTC">BTC</option>
                        <option value="USDT">USDT</option>
                        <option value="ETH">ETH</option>
                    </select>
                    {token === 'BTC' && <img src={btc} alt="btc" className="select-token-image"/>}
                    {token === 'USDT' && <img src={usdt} alt="usdt" className="select-token-image"/>}
                    {token === 'ETH' && <img src={eth} alt="eth" className="select-token-image"/>}
                </div>
                { errors.send && <p className="errors mt-3">{errors.send?.message}</p>}
                <div className="input-border">
                    <label className="label-send">{labelTwo}</label>
                    <Controller 
                        render={({field, field: { onChange, onBlur, name, value } }) => (
                            <NumberFormat
                            thousandSeparator={true}
                            className="input-amount"
                            inputMode="numeric"
                            // placeholder="0.0001"
                            // onValueChange={onChange}
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
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
                    <select 
                    {...register("fiat")}
                    defaultValue="NGN"
                    name="token" id="fiat" 
                    className="select-token" onChange={handleCountry}
                    >
                        <option value="ngn">NGN</option>
                    </select>
                    {country === 'ngn' && <img src={nig} alt="btc" className="select-token-image"/>}
                </div>
                {errors.receive && <p className="errors">{errors.receive?.message}</p>}
                <div className="conversion">
                    {token === 'BTC' ? <p>{` 1 ${token} = ${conversionRates.BTC.toLocaleString()}`}</p> : token === 'USDT' ? <p>{` 1 ${token} = ${conversionRates.USDT.toLocaleString()}`}</p> : <p>{` 1 ${token} = ${conversionRates.ETH.toLocaleString()}`}</p>}
                </div>
                <div className="homepage-seperator"></div>
                {type === 'transfer' ? 
                <div className="input-border">
                    <label className="label-send">Destination</label>
                    <select name="destination" id="" className="select-destination" onChange={handleCountry}>
                        <option value="ngn">NGN</option>
                    </select>
                    <img src={nig} alt="btc" className="select-country-image"/>
                </div> : null }
                <div className="col text-center homepage-send-btn mb-4">
                    <button type="submit" className="btn btn-primary btn-lg">Continue</button>
                </div>
            </div>
        </form>
     );
}

export default SendForm;