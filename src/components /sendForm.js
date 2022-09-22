import React, { useState } from "react";
import { MdSwapVert } from "react-icons/md";
import '../styles/homepage.css';
import nig from '../images/nigeria.png';

import btc_img from '../images/bitcoin-btc-logo.png';
import busd_img from '../images/binance-usd-busd-logo.png';
import usdt_img from '../images/tether.png'
import eth_img from '../images/ethereum-eth-logo.png'

import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import NumberFormat from 'react-number-format';
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

import { transferDetails } from "../redux/transfer/actions/actions";
import { useDispatch, useSelector } from "react-redux";

// import { getBusdPrice } from "../api/api";

const StyledSelect = styled.select `
    border: none;
    outline: none;
    font-size: 1.1rem;
    font-weight: bold;
    position: absolute;
    margin-top: -9px;
    background-color: white;
    margin-left: 9px;
`

const StyledSelectTwo = styled(StyledSelect)`
    padding-left: 6px;
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

function SendForm({type}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {transfer, token_rates} = useSelector(state => state.transfer_details)

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            send: transfer.sendAmount,
            receive: transfer.receiveAmount,
            token: transfer.tokenValue || 'BTC'
        },
        resolver: yupResolver(schema),
        mode: "all",
    });
    const [token, setToken ] = useState(transfer.tokenValue || 'BTC');
    const [country, setCountry ] = useState('NGN');
    const [receiveAmount, setReceive ] = useState('');
    const [sendAmount, setSend ] = useState('');
    

    const [switchInputs, setSwitchInputs ] = useState(false);

    const handleToken = (e) => {
        setToken(e.target.value);
    };
    const handleCountry = (e) => {
        setCountry(e.target.value);
    };
    
    const handleReceive = (value) => {
        setReceive(value)
        if(value) {
            if (token === 'BTC') {
                setValue("send", value / token_rates.data[0]['BTC'])
            }else if (token === 'USDT') {
                setValue("send", value / token_rates.data[1]['USDT'])
            }else if  (token === 'ETH'){
                setValue("send", value / token_rates.data[2]['ETH'])
            }else if  (token === 'BUSD'){
                setValue("send", value / token_rates.data[3]['BUSD'])
            }
        }else {
            setValue("send", '')
            setValue("receive", '')
        }
    };
    const handleSend = (value) => {
        setSend(value)
        if(value) {
            if (token === 'BTC') {
                setValue("receive", value * token_rates.data[0]['BTC'])
            }else if (token === 'USDT') {
                setValue("receive", value * token_rates.data[1]['USDT'])
            }else if  (token === 'ETH'){
                setValue("receive", value * token_rates.data[2]['ETH'])
            }else if  (token === 'BUSD'){
                setValue("receive", value * token_rates.data[3]['BUSD'])
            }
        }else {
            setValue("send", '')
            setValue("receive", '')
        }
    };
    const handleSwitch = () => {
        setSwitchInputs(() => !switchInputs)
    };    
    const onSubmit = () => {
        const transferDetail = {
            sendAmount: sendAmount, 
            receiveAmount: receiveAmount,
            tokenValue: token
        }
        dispatch(transferDetails(transferDetail))
        // sessionStorage.setItem("transferDetails", JSON.stringify(transferDetail))
        navigate("/details")
    };

    // console.log(token_rates.data[0]['USDT'])

    return ( 
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="switch" onClick={handleSwitch}>
                <MdSwapVert 
                size={20} 
                style={{fill: 'white', marginLeft: 10, marginTop: 10}}
                />
            </div>
            <div className="row homepage">
                <div className={switchInputs === true ? "input-flex" : ""}>
                    <div className="input-border">
                        <label className="label-send">You send</label>
                        <Controller 
                            name="send"
                            control={control}
                            render={({field, field: { onChange, value } }) => (
                                <NumberFormat
                                thousandSeparator={true}
                                className="input-amount"
                                inputMode="numeric"
                                placeholder="0.001"
                                decimalScale={3}
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

                            <option value="BTC" >BTC</option>
                            <option value="USDT" >USDT</option>
                            <option value="ETH" >ETH</option>
                            <option value="BUSD" >BUSD</option>
                        </StyledSelect>
                        {token === 'BTC' && <img src={btc_img} alt="btc" className="select-token-image"/>}
                        {token === 'BUSD' && <img src={busd_img} alt="btc" className="select-token-image"/>}
                        {token === 'USDT' && <img src={usdt_img} alt="trc20" className="select-token-image"/>}
                        {token === 'ETH' && <img src={eth_img} alt="tron" className="select-token-image"/>}
                    </div>
                    { errors.send && <p className="errors mt-4">{errors.send?.message}</p>}
                    
                    <div className="receive-input">
                        <div className="input-border">
                            <label className="label-send">Recipient gets</label>
                            <Controller 
                                name="receive"
                                control={control}
                                render={({field, field: { onChange, value } }) => (
                                    <NumberFormat
                                    thousandSeparator={true}
                                    className="input-amount"
                                    inputMode="numeric"
                                    placeholder="500"
                                    decimalScale={3}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        onChange(value)
                                        handleReceive(value)
                                    }}
                                    value={value}
                                    {...field}
                                    />
                                )}
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
                    </div>
                    {errors.receive && <p className="errors mt-4">{errors.receive?.message}</p>}
                </div> 
                <div className="conversion">
                    <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={token === 'BTC' ? token_rates.data[0]['BTC'] : token === 'USDT' ? 
                            token_rates.data[1]['USDT'] : token === 'ETH' ? 
                            token_rates.data[2]['ETH']: token === 'BUSD' ? token_rates.data[3]['BUSD']: null}
                    decimalScale={3}
                    prefix={`1 ${token} = `}
                    suffix={` NGN`}
                    decimalSeparator="."
                    displayType="text"
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true} 
                    className="conversion-number"
                    />
                </div>
                {/* <div className="homepage-seperator"></div> */}
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
        </>
     );
}

export default SendForm;