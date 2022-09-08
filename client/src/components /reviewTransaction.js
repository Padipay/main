import React, { useCallback, useEffect, useState} from "react";
import '../styles/reviewTransaction.css'
import Stepper from "./stepper";
import Header from "./header";
import FormTitle from "./formTitle";
import FormContainerLayout from "./formContainerLayout";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import firebase from '../firebase/firebase';
import NumberFormat from 'react-number-format';

import { useSelector } from "react-redux";


function ReviewTransaction() {
    const {transfer, recepient, token_rates} = useSelector(state => state.transfer_details)
    const [page, setPage ] = useState(2);
    const [transferDetails, setTransferDetails ] = useState({});
    const [recepientDetails, setRecepientDetails ] = useState({});
    // const [rates, setRates] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading ] = useState(true)

    //   useEffect(() => {
    //     const transferDetails = JSON.parse(sessionStorage.getItem("transferDetails"));
    //     const recepientDetails = JSON.parse(sessionStorage.getItem("recepientDetails"));
    //     setTransferDetails(transferDetails)
    //     setRecepientDetails(recepientDetails)
    //     const convRates = async () => {
    //         const temp = []
    //         await firebase.firestore().collection("rates")
    //             .onSnapshot((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     if (doc.exists) {
    //                         temp.push({
    //                             token: doc.data().Token,
    //                             rate:  doc.data().currentRate
    //                         });
    //                     }
    //                     setRates(temp)
    //                     setLoading(false)
    //                 });
    //             })
    //         }
    //     convRates()
    //     return () => {
    //         convRates()
    //     }

    // }, []);
    // console.log(rates)


    return ( 
        <>
            <Header />
                <div className="row main-content">
                    <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
                        <Stepper page_num={page}/>
                    </div>
                    <FormContainerLayout title="Review transfer details" style={{ height: 220}}>
                        <div className="review-heading">
                            <p className="main-heading">Transfer Details</p>
                            <Link className="link" to="/send">
                                <p className="edit"> 
                                    <RiEdit2Fill size={20} style={{fill: '#003399', marginRight: 15}}/>  
                                    Edit
                                </p>
                            </Link>
                        </div>
                        <div className="seperator"></div>
                        <div className="transfer-details mt-3">
                            <p className="description">Send Amount</p>
                            <p className="details">
                                <NumberFormat
                                    thousandsGroupStyle="thousand"
                                    value={`${transfer.sendAmount}`}
                                    suffix={` ${transfer.tokenValue}`}
                                    decimalSeparator="."
                                    displayType="text"
                                    type="text"
                                    thousandSeparator={true}
                                    allowNegative={true} 
                                    decimalScale={2}
                                />
                            </p>
                        </div>
                        <div className="transfer-details">
                            <p className="description">Recepient Receives</p>
                            <p className="details">
                                <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={transfer.receiveAmount}
                                suffix={" NGN"}
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true} 
                                decimalScale={2}
                                />
                            </p>
                        </div>
                        <div className="transfer-details">
                            <p className="description">{`1 ${transfer.tokenValue} ~ NGN Rate`}</p>
                            <p className="details">
                                <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={transfer.tokenValue === 'BTC' ? token_rates.data[0]['BTC'] : transfer.tokenValue === 'USDT' ? 
                                        token_rates.data[1]['USDT'] : transfer.tokenValue === 'ETH' ? 
                                        token_rates.data[2]['ETH']: transfer.tokenValue === 'BUSD' ? token_rates.data[3]['BUSD']: null}
                                decimalScale={3}
                                suffix={` NGN`}
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true} 
                                decimalScale={2}
                                />
                            </p> 
                        </div>
                        
                        <div className="sub-content">
                            <div className="review-heading">
                                <p className="main-heading">Recepient Details</p>
                                <Link className="link" to="/details">
                                    <p className="edit"> 
                                        <RiEdit2Fill size={20} style={{fill: '#003399', marginRight: 15}}/>  
                                        Edit
                                    </p>
                                </Link>
                            </div>
                            <div className="seperator"></div>
                            <div className="transfer-details mt-3">
                                <p className="description">Recepient Name</p>
                                <p className="details">{`${recepient.accountName.substring(0, 15)}...`}</p>
                            </div>
                            <div className="transfer-details">
                                <p className="description">Account Number</p>
                                <p className="details">{recepient.accountNumber}</p>
                            </div>
                            <div className="continue-btn">
                                <Link to="../complete">
                                    <button type="button" className="btn btn-primary btn-lg">Continue</button>
                                </Link>
                            </div>
                        </div>
                    </FormContainerLayout>
                </div>
            </>
    );
}

export default ReviewTransaction;