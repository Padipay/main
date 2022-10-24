import React, { useState} from "react";
import '../../styles/reviewTransaction.css'
import Stepper from "../Layouts/stepper";
import Header from "../Layouts/header";
import FormContainerLayout from "../Layouts/formContainerLayout";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import NumberFormat from 'react-number-format';
import { editTransfer } from "../../redux/transfer/actions/actions";

import { useDispatch, useSelector } from "react-redux";


function ReviewTransaction() {
    const {transfer, recepient, token_rates} = useSelector(state => state.transfer_details)
    const [page ] = useState(2);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleEdit = () => {
        dispatch(editTransfer())
        navigate('/send')
    }

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
                                <p className="edit" onClick={handleEdit}> 
                                    <RiEdit2Fill size={20} style={{fill: '#003399', marginRight: 15}}/>  
                                    Edit
                                </p>
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
                                    // decimalScale={0}
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
                                value={transfer.rate}
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