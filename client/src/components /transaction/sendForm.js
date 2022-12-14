import React, { useState } from "react";
import { MdSwapVert } from "react-icons/md";
import '../../styles/homepage.css';
import nig from '../../images/nigeria.png';

import btc_img from '../../images/bitcoin-btc-logo.png';
import busd_img from '../../images/binance-usd-busd-logo.png';
import usdt_img from '../../images/tether.png'
import eth_img from '../../images/ethereum-eth-logo.png';
import bnb from '../../images/bnb.png';

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import NumberFormat from 'react-number-format';
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

import { transferDetails, editTransfer } from "../../redux/transfer/actions/actions";
import { useDispatch, useSelector } from "react-redux";


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
const schema  = yup.object().shape({
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

    const {transfer, token_rates, edit_transfer} = useSelector(state => state.transfer_details)
    const [token, setToken ] = useState(transfer.tokenValue || 'USDT');
    const [country, setCountry ] = useState('NGN');
    const [receiveAmount, setReceive ] = useState(transfer.receiveAmount || '5,000');
    const [sendAmount, setSend ] = useState(transfer.sendAmount || Number(parseFloat(receiveAmount.replace(/,/g, '')) / token_rates.data[1]['USDT']).toFixed(2));
    const [switchInputs, setSwitchInputs ] = useState(false);
    const [rates, setRates] = useState(transfer.rate || token_rates.data[1]['USDT'].toFixed(2));

    const { register, handleSubmit, trigger, setValue, getValues, formState: { errors, isValid } } = useForm({
        defaultValues: {
            send: sendAmount,
            receive: receiveAmount,
            token: transfer.tokenValue || 'USDT'
        },
        resolver: yupResolver(schema),
        mode: "all",
    });

    const handleToken = (e) => {
        setToken(e.target.value);
        if (receiveAmount) {
            if (e.target.value === 'BTC') {
                const btcValue = parseFloat(receiveAmount.replace(/,/g, '')) / token_rates.data[0]['BTC']
                setSend(btcValue.toFixed(8))
                setRates(token_rates.data[0]['BTC'].toFixed(2))
                setValue("send", btcValue.toFixed(8))
            }else if (e.target.value === 'USDT') {
                const usdtValue = parseFloat(receiveAmount.replace(/,/g, '')) / token_rates.data[1]['USDT']
                setValue("send", usdtValue.toFixed(2))
                setRates(token_rates.data[1]['USDT'].toFixed(2))
                setSend(usdtValue.toFixed(2))
            }else if  (e.target.value === 'ETH'){
                const ethValue = parseFloat(receiveAmount.replace(/,/g, '')) / token_rates.data[2]['ETH']
                setValue("send", ethValue.toFixed(8))
                setSend(ethValue.toFixed(8))
                setRates(token_rates.data[2]['ETH'].toFixed(2))
            }else if  (e.target.value === 'BUSD'){
                const busdValue = parseFloat(receiveAmount.replace(/,/g, '')) / token_rates.data[3]['BUSD']
                setValue("send", busdValue.toFixed(2))
                setSend(busdValue.toFixed(2))
                setRates(token_rates.data[3]['BUSD'].toFixed(2))
            }else if(e.target.value === 'BNB') {
                const bnbValue = parseFloat(receiveAmount.replace(/,/g, '')) / token_rates.data[4]['BNB']
                setValue("send", bnbValue.toFixed(2))
                setSend(bnbValue.toFixed(2))
                setRates(token_rates.data[4]['BNB'].toFixed(2))
            }    
        }       
    };
    const handleCountry = (e) => {
        setCountry(e.target.value);
    };
    const handleSend = (e) => {
        const value  = e.target.value
        // const value = (Number(e.target.value.replace(/\D/g, '')) || '').toLocaleString();
        setSend(value)
        // setValue("send", value, true)
        if(value) {
            if (token === 'BTC') {
                const receive = value * token_rates.data[0]['BTC'].toFixed(2)
                setReceive(receive.toLocaleString())
                setValue("receive", receive)
                setRates(token_rates.data[0]['BTC'].toFixed(2))
                trigger("receive");
            }else if (token === 'USDT') {
                const receive = value * token_rates.data[1]['USDT'].toFixed(2)
                setReceive(receive.toLocaleString())
                setValue("receive", receive)
                setRates(token_rates.data[1]['USDT'].toFixed(2))
                trigger("receive");
            }else if  (token === 'ETH'){
                const receive = value * token_rates.data[2]['ETH'].toFixed(2)
                setReceive(receive.toLocaleString())
                setValue("receive", receive)
                setRates(token_rates.data[2]['ETH'].toFixed(2))
                trigger("receive");
            }else if  (token === 'BUSD'){
                const receive = value * token_rates.data[3]['BUSD'].toFixed(2)
                setReceive(receive.toLocaleString())
                setValue("receive", receive)
                setRates(token_rates.data[3]['BUSD'].toFixed(2))
                trigger("receive");
            }else if  (token === 'BNB') {
                const receive = value * token_rates.data[4]['BNB'].toFixed(2)
                setReceive(receive.toLocaleString())
                setValue("receive", receive)
                setRates(token_rates.data[4]['BNB'].toFixed(2))
                trigger("receive");
            }
        }else {
            setSend('')
            setReceive('')
        }
    };


    const handleReceive = (e) => {
        // let { name, value } = e.target;
        const value = (Number(e.target.value.replace(/\D/g, '')) || '').toLocaleString();
        setReceive(value)
        // setValue("receive", value, true)
        if (value) {
            if (token === 'BTC') {
                const btcvalue = parseFloat(value.replace(/,/g, '')) / token_rates.data[0]['BTC']
                setSend(btcvalue.toFixed(8))
                setValue("send", btcvalue)
                trigger("send");
            }else if (token === 'USDT') {
                const usdtValue = parseFloat(value.replace(/,/g, '')) / token_rates.data[1]['USDT']
                setSend(usdtValue.toFixed(2))
                setValue("send", usdtValue)
                trigger("send");
            }else if  (token === 'ETH'){
                const ethValue = parseFloat(value.replace(/,/g, '')) / token_rates.data[2]['ETH']
                setSend(ethValue.toFixed(8))
                setValue("send", ethValue)
                trigger("send");
            }else if  (token === 'BUSD'){
                const busdValue = parseFloat(value.replace(/,/g, '')) / token_rates.data[3]['BUSD']
                setSend(busdValue.toFixed(2))
                setValue("send", busdValue)
                trigger("send");
            }else if(token === 'BNB') {
                const bnbValue = parseFloat(value.replace(/,/g, '')) / token_rates.data[4]['BNB']
                setSend(bnbValue.toFixed(2))
                setValue("send", bnbValue)
                trigger("send");
            }
            else {
                setSend('')
                setReceive('')
            }
        }
    };
    const handleSwitch = () => {
        setSwitchInputs(() => !switchInputs)
    };    
    const onSubmit = () => {
        const values = getValues()
        const transferDetail = {
            sendAmount: sendAmount, 
            receiveAmount: receiveAmount,
            tokenValue: values.token,
            rate: rates
        }
        if (edit_transfer) {
            navigate('/review')
            dispatch(transferDetails(transferDetail))
            dispatch(editTransfer())
        }else{
            dispatch(transferDetails(transferDetail))
            navigate("/details")
        }
    };

    return ( 
        <>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
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
                        <input 
                            {...register("send", {
                                onChange: (e) => {
                                    handleSend(e)
                                } 
                            })}
                            type="number" 
                            step="any"
                            className="input-amount" placeholder="0.001"
                            value={sendAmount}
                            /> 
                        <StyledSelect
                            {...register("token")}
                            name="token" id="tokens" 
                            onChange={handleToken} 
                            value={token}>
                
                            <option value="BTC" >BTC</option>
                            <option value="USDT" >USDT</option>
                            <option value="ETH" >ETH</option>
                            <option value="BUSD" >BUSD</option>
                            <option value="BNB" >BNB</option>
                        </StyledSelect>
                        {token === 'BTC' && <img src={btc_img} alt="btc" className="select-token-image"/>}
                        {token === 'BUSD' && <img src={busd_img} alt="busd" className="select-token-image"/>}
                        {token === 'USDT' && <img src={usdt_img} alt="usdt" className="select-token-image"/>}
                        {token === 'ETH' && <img src={eth_img} alt="eth" className="select-token-image"/>}
                        {token === 'BNB' && <img src={bnb} alt="bnb" className="select-token-image"/>}
                    </div>
                    { errors.send && <p className="errors mt-4">{errors.send?.message}</p>}
                    
                    <div className="receive-input">
                        <div className="input-border">
                            <label className="label-send">Recipient gets</label>
                            <input 
                            {...register("receive", {
                                onChange: (e) => {
                                    handleReceive(e)
                                },
                                validate: (value) => {
                                    return parseFloat(value.replace(/,/g, '')) <= 2000000 || 'Maximum amount to send is 2,000,000 NGN'
                                }                    
                            })}
                            type="text" 
                            step="0.01"
                            className="input-amount" placeholder="1,000"
                            value={receiveAmount}
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
                            token_rates.data[2]['ETH']: token === 'BUSD' ? token_rates.data[3]['BUSD']: token === 'BNB' ? token_rates.data[4]['BNB'] : null}
                    decimalScale={2}
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
                <div className="col-12 text-center homepage-send-btn mb-4">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={!isValid}>Send Money Fast ????</button>
                </div>
            </div>
        </form>
        </>
     );
}

export default SendForm;