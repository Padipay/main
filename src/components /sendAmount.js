import React,{useState} from "react";
import '../styles/sendAmount.css'
import Header from "./header";
import FormTitle from "./formTitle";
import SendForm from "./sendForm";
import Stepper from "./stepper";
import FormContainerLayout from "./formContainerLayout";
import HomeTab from "./Hometab";

function SendAmount() {
    const [page, setPage ] = useState(0)
    return ( 
        <>
        <Header />
            <div className="row main-content">
                <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
                    <Stepper page_num={page}/>
                </div>
                <FormContainerLayout title="How much are you sending?" style={{ paddingTop: 0}}>
                    <HomeTab />
                </FormContainerLayout>
                {/* <div className="col-9 send-content">
                    <FormTitle title="How much are you sending?"/>
                    <div className="content">
                        <SendForm type='transfer'/>
                    </div>
                </div> */}
            </div>
        </>
     );
}

export default SendAmount;