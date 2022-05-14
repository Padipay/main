import React, { createContext, useContext, useState } from "react";
import { MdSwapVert } from "react-icons/md";
import '../styles/homepage.css';
import btc from '../images/bitcoin-btc-logo.png';
import eth from '../images/ethereum-eth-logo.png';
import usdt from '../images/tether-usdt-logo.png';
import nig from '../images/nigeria.png';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TransferContext } from "../contextApi/TransferContext";

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
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)

    });
    const [token, setToken ] = useState('btc');
    const [country, setCountry ] = useState('ngn');
    const [receive, setReceive ] = useState('');
    const [send, setSend ] = useState('');

    const navigate = useNavigate();

    const handleToken = (e) => {
        setToken(e.target.value);
        setTokenValue(e.target.value);
    };
    const handleCountry = (e) => {
        setCountry(e.target.value);
    };
    
    const handleReceive = (e) => {
        const { value } = e.target;
        if(value) {
            const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
            setReceive(formattedValue);
            // setReceiveAmount(formattedValue);

            setSend(String(receive).replace(/,/g, '') / 10000)
            // setSendAmount(String(receive).replace(/,/g, '') / 10000);
        }else {
            setReceive('')
            setSend('')
        }
        // setReceive(e.target.value)
    };

    const handleSend = (e) => {
        const { value } = e.target;
        if(value) {
            const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
            setSend(formattedValue);
            setReceive(String(send).replace(/,/g, '') * 10000)
        }else {
            setSend('')
            setReceive('')
        }
        
        // setSend(e.target.value)
        // // setReceive(send * 10000)
        // setSendAmount(e.target.value);
        // setSendAmount(e.target.value);
    };

    const handleSwitch = () => {
        setReceive(send)
        setSend(receive)
    };
    
    const onSubmit = () => {
        console.log("data")
        navigate("/details")
        const transferDetails = {
            sendAmount: send, 
            receiveAmount: receive,
            tokenValue: token
        }
        sessionStorage.setItem("transferDetails", JSON.stringify(transferDetails))
    };

    const {setSendAmount, setReceiveAmount, setTokenValue } = useContext(TransferContext);
    // console.log(sendAmount)
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
                    <input 
                        type="text" 
                        placeholder="0.0001"
                        {...register("send")}
                        className="input-amount" 
                        value={send}
                        onChange={handleSend}
                    />
                    <select 
                        {...register("token")}
                        defaultValue="BTC"
                        name="token" id="tokens" 
                        className="select-token" onChange={handleToken}
                    >
                        <option value="btc">BTC</option>
                        <option value="usdt">USDT</option>
                        <option value="eth">ETH</option>
                    </select>
                    {token === 'btc' && <img src={btc} alt="btc" className="select-token-image"/>}
                    {token === 'usdt' && <img src={usdt} alt="usdt" className="select-token-image"/>}
                    {token === 'eth' && <img src={eth} alt="eth" className="select-token-image"/>}
                </div>
                { errors.send && <p className="errors mt-3">{errors.send?.message}</p>}
                <div className="input-border">
                    <label className="label-send">{labelTwo}</label>
                    <input 
                        type="text" 
                        placeholder="500"
                        {...register("receive")}
                        className="input-amount" 
                        value={receive}
                        onChange={handleReceive}
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
                    <p>1 BTC = 10,000 NGN</p>
                </div>
                <div className="homepage-seperator"></div>
                {type === 'transfer' ? 
                <div className="input-border">
                    <label className="label-send">Destination</label>
                    {country === 'ngn' && <img src={nig} alt="btc" className="select-country-image"/>}
                    <select name="destination" id="" className="select-destination" onChange={handleCountry}>
                        <option value="ngn">NGN</option>
                    </select>
                </div> : null }
                <div className="col text-center homepage-send-btn mb-4">
                    <button type="submit" className="btn btn-primary btn-lg">Continue</button>
                </div>
            </div>
        </form>
     );
}

export default SendForm;