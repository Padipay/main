import React, {  } from "react";
import '../styles/Hometab.css'
import '../styles/homepage.css';
import styled from "styled-components";
import { StyledFormContainer } from "../styles/globalStyles";
import SkeletonCard from "./SkeletonCard";
import SendForm from "./sendForm";
import { useSelector } from "react-redux";


const SendFormContainer = styled(StyledFormContainer)`
    padding-top : 20px;
    box-shadow: 8px 7px #888888;
`

function SendFormTab({className}) {
    const {loading} = useSelector(state => state.transfer_details)
    return ( 
        <div className={className}>
            {loading && <SkeletonCard />}
            {!loading && 
            <SendFormContainer>
                <div className="home-tab">
                    <div className="tabs-container">
                        <div className="tabs">
                            <input type="radio" id="radio-1" name="tabs" defaultChecked/>
                            <label className="tab" htmlFor="radio-1">Transfer Money</label>
                            {/* <input type="radio" id="radio-2" name="tabs" onClick={() => setState('crypto')}/> */}
                            {/* <label className="tab" htmlFor="radio-2">Sell Crypto</label> */}
                            <span className="glider"></span>
                        </div>
                    </div>
                </div>
                <SendForm type='transfer'/>
            </SendFormContainer>}
        </div>
     );
}

export default SendFormTab;