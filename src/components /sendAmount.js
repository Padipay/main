import React,{useEffect, useState} from "react";
import '../styles/sendAmount.css'
import Header from "./header";
import Stepper from "./stepper";
import FormContainerLayout from "./formContainerLayout";
import SendFormTab from "./SendFormTab";
import { useNavigate } from "react-router-dom";

function SendAmount() {
    const [page, setPage ] = useState(0)
    return ( 
        <>
        <Header />
            <div className="row main-content">
                <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
                    <Stepper page_num={page}/>
                </div>
                <FormContainerLayout title="How much are you sending?">
                    <SendFormTab />
                </FormContainerLayout>
            </div>
        </>
     );
}

export default SendAmount;