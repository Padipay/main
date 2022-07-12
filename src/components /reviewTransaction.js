import React, { useContext, useEffect, useState } from "react";
import '../styles/reviewTransaction.css'
import Stepper from "./stepper";
import Header from "./header";
import FormTitle from "./formTitle";
import FormContainerLayout from "./formContainerLayout";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import firebase from '../firebase/firebase';
import NumberFormat from 'react-number-format';

function ReviewTransaction() {
    const [page, setPage ] = useState(2);
    const [transferDetails, setTransferDetails ] = useState({});
    const [recepientDetails, setRecepientDetails ] = useState({});
    const [rates, setRates] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading ] = useState(true)

    useEffect(() => {
        const transferDetails = JSON.parse(sessionStorage.getItem("transferDetails"));
        const recepientDetails = JSON.parse(sessionStorage.getItem("recepientDetails"));
        setTransferDetails(transferDetails)
        setRecepientDetails(recepientDetails)
        const convRates = async () => {
            const temp = []
            await firebase.firestore().collection("rates")
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            temp.push({
                                token: doc.data().Token,
                                rate:  doc.data().currentRate
                            });
                        }
                        setRates(temp)
                        setLoading(false)
                    });
                })
            }
        convRates()
        return () => convRates()

    }, []);
    const {sendAmount, receiveAmount, tokenValue} = transferDetails;
    const {accountNumber, accountName } = recepientDetails;
 
   
    // const {sendAmount, receiveAmount, tokenValue, recepientName, recepientAccNum } = useContext(TransferContext)
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
                                    value={`${sendAmount}`}
                                    suffix={` ${tokenValue}`}
                                    decimalSeparator="."
                                    displayType="text"
                                    type="text"
                                    thousandSeparator={true}
                                    allowNegative={true} 
                                />
                            </p>
                        </div>
                        <div className="transfer-details">
                            <p className="description">Recepient Receives</p>
                            <p className="details">
                                <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={receiveAmount}
                                suffix={" NGN"}
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true} 
                                />
                            </p>
                        </div>
                        <div className="transfer-details">
                            <p className="description">{`1 ${tokenValue} ~ NGN Rate`}</p>
                            {!loading && 
                            <p className="details">{tokenValue === 'BTC' ? `${rates[0].rate.toLocaleString()} ${tokenValue}` : 
                            tokenValue === 'BUSD' ? `${rates[1].rate.toLocaleString()} ${tokenValue}`: tokenValue === 'TRX' ? `${rates[2].rate.toLocaleString()} ${tokenValue}` :
                            `${rates[3].rate.toLocaleString()} ${tokenValue}`}</p> }
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
                                <p className="details">{accountName}</p>
                            </div>
                            <div className="transfer-details">
                                <p className="description">Account Number</p>
                                <p className="details">{accountNumber}</p>
                            </div>
                            <div className="continue-btn">
                                <Link to="/complete">
                                    <button type="button" className="btn btn-primary btn-lg">Continue</button>
                                </Link>
                            </div>
                        </div>
                    </FormContainerLayout>
                    {/* <div className="col-lg-9 col-sm-12 send-content">
                        <FormTitle title="Review transfer details"/>
                        <div className="details-content">
                            <div className="review-heading">
                                <p className="main-heading">Transfer Details</p>
                                <p className="edit">Edit</p>
                            </div>
                            <div className="seperator"></div>
                            <div className="transfer-details mt-3">
                                <p className="description">Send Amount</p>
                                <p className="details">0.00002167 BTC</p>
                            </div>
                            <div className="transfer-details">
                                <p className="description">Recepient Receives</p>
                                <p className="details">500 NGN</p>
                            </div>
                            <div className="transfer-details">
                                <p className="description">Amount in USD</p>
                                <p className="details">0.85 USD</p>
                            </div>
                            <div className="transfer-details">
                                <p className="description">NGN/BTC rate</p>
                                <p className="details">23,064,666.27 NGN</p>
                            </div>
                        </div>

                        <div className="sub-content">
                            <div className="review-heading">
                                <p className="main-heading">Recepient Details</p>
                                <p className="edit">Edit</p>
                            </div>
                            <div className="seperator"></div>
                            <div className="transfer-details mt-3">
                                <p className="description">Recepient Name</p>
                                <p className="details">Babangida Tolu</p>
                            </div>
                            <div className="transfer-details">
                                <p className="description">Account Number</p>
                                <p className="details">0211695605</p>
                            </div>
                            <div className="continue-btn">
                                <Link to="/complete">
                                    <button type="button" className="btn btn-primary btn-lg">Continue</button>
                                </Link>
                            </div>
                        </div>

                    </div> */}
                </div>
             </>
    );
}

export default ReviewTransaction;