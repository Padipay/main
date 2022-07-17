import React,{useEffect, useState} from "react";
import '../styles/sendAmount.css'
import Header from "./header";
import Stepper from "./stepper";
import FormContainerLayout from "./formContainerLayout";
import SendFormTab from "./SendFormTab";
import TransferMoney from "./transferMoney";
import SellCrypto from "./sellCrypto";
import { StyledFormContainer } from "../styles/globalStyles";
import styled from "styled-components";

const SendAmountContainer = styled(StyledFormContainer)`
    padding-top : 20px;
    width: 464px;
`

function SendAmount() {
    const [page, setPage ] = useState(0)
    const [state, setState] = useState('transfer')
    return ( 
        <>
        <Header />
            <div className="row main-content">
                <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
                    <Stepper page_num={page}/>
                </div>
                    <FormContainerLayout title="How much are you sending?">
                        <SendAmountContainer>
                            <div className="home-tab">
                                <div className="tabs-container">
                                    <div className="tabs">
                                        <input type="radio" id="radio-1" name="tabs" defaultChecked onClick={() => setState('transfer')}/>
                                        <label className="tab" htmlFor="radio-1">Transfer Money</label>
                                        {/* <input type="radio" id="radio-2" name="tabs" onClick={() => setState('crypto')}/> */}
                                        {/* <label className="tab" htmlFor="radio-2">Sell Crypto</label> */}
                                        <span className="glider"></span>
                                    </div>
                                </div>
                            </div>
                            {state === 'transfer' ?<TransferMoney /> : <SellCrypto /> }
                        </SendAmountContainer>
                    </FormContainerLayout>
            </div>
        </>
     );
}

export default SendAmount;