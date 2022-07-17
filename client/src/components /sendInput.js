import React, { useEffect } from "react";
import btc from '../images/bitcoin-btc-logo.png';
import eth from '../images/ethereum-eth-logo.png';
import usdt from '../images/tether-usdt-logo.png';
import nig from '../images/nigeria.png';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import NumberFormat from 'react-number-format';


const schema  = yup.object({
    send: yup.string("Enter an amount to send")
    .required("Please enter an amount send")
    .typeError("Please enter an amount send")
}).required();

function SendInput({label, sendAmount}) {
    const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        // defaultValues: {
        //     send: 0.0001,
        //     receive: 500
        // }
    });
    const [token, setToken ] = useState('BTC');
    const [conversionRates, setConversionRates] = useState({
        BTC: 0,
        USDT: 0,
        ETH: 0
    })

    const handleSend = (value) => {
        if(value) {
            if (token === 'BTC') {
                setValue("receive", value * conversionRates.BTC)
            }else if (token === 'USDT') {
                setValue("receive", value * conversionRates.USDT)
            }else{
                setValue("receive", value * conversionRates.ETH)
            }
        }else {
            setValue("send", '')
            setValue("receive", '')
        }
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

    return ( 
        <>
            <div>
                <div className="input-border">
                    <label className="label-send">{label}</label>
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
                        className="select-token" 
                        onChange={(e) => setToken(e.target.value)}
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
            </div>
        </>
     );
}

export default SendInput;