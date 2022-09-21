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
import SendForm from "./sendForm";
import SkeletonCard from "./SkeletonCard";
import { useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const SendAmountContainer = styled(StyledFormContainer)`
    padding-top : 0px;
    width: 464px;
`

function SendAmount() {
    const [page, setPage ] = useState(0)
    const {loading} = useSelector(state => state.transfer_details)
    // const [loading, setLoading] = useState(true)

    return ( 
        <>
        <Header />
            <div className="row main-content">
                <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
                    <Stepper page_num={page}/>
                </div> 
                
                {loading && 
                <div className="col-lg-5 col-sm-6 mb-5 mt-3">
                    <SkeletonCard />
                    </div>
                }
                {!loading && 
                    <FormContainerLayout title="How much are you sending?">
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
                    </FormContainerLayout>
                }
            </div>
        </>
     );
}

export default SendAmount;