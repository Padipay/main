import React from "react";
import { MdSwapVert } from "react-icons/md";
import '../styles/homepage.css';
import SendForm from "./sendForm";

function SendCrypto() {
    return ( 
        <>
            <SendForm 
            type='crypto'
            labelOne="You Sell"
            labelTwo="You get"/>
        </>
     );
}

export default SendCrypto;