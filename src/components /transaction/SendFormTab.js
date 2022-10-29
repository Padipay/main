import React, { useEffect } from "react";
import '../../styles/Hometab.css'
import '../../styles/homepage.css';
import styled from "styled-components";
import { StyledFormContainer } from "../../styles/globalStyles";
import SkeletonCard from "../Layouts/SkeletonCard";
import SendForm from "./sendForm";
import { useDispatch, useSelector } from "react-redux";
import { fetch_api_rates } from "../../redux/transfer/actions/actions";

const SendFormContainer = styled(StyledFormContainer)`
    padding-top : 20px;
    box-shadow: 8px 7px #888888;
`

function SendFormTab({className}) {
    const {loading} = useSelector(state => state.transfer_details)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetch_api_rates())
            const interval = setInterval(() => {
                dispatch(fetch_api_rates())
            }, 7000);
        return () => clearInterval(interval)
    },[])

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