import React, { useState } from "react";
import SendForm from "./sendForm";


function TransferMoney() {
    const [token, setToken ] = useState('btc')
    const [country, setCountry ] = useState('ngn')

    const handleChange = (e) => {
        setToken(e.target.value);
    }
    const handleCountry = (e) => {
        setCountry(e.target.value);
    }
    return ( 
        <>
            <SendForm 
            type='transfer'
            labelOne="You send"
            labelTwo="Recipient gets"/>
        </>
     );
}

export default TransferMoney;