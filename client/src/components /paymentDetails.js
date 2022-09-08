import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import '../styles/modal.css';
import logo from '../images/Logo2.png'
import { QRCode } from 'react-qrcode-logo';

import { MdOutlineClose } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";
import { BiStopwatch } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";

import firebase from '../firebase/firebase';
import { transactSuccessEmail } from "../api/transactionSuccessEmail";
import { sendSms } from "../api/sendSms";
import CountdownTimer from './countdownTimer';
import { useDispatch, useSelector } from "react-redux";
import { paymentStatus } from "../redux/transfer/actions/actions";


function PaymentDetails({open}) {
    const dispatch = useDispatch();
    const { payment, transfer } = useSelector(state => state.transfer_details)

//   const {tokenValue, sendAmount, receiveAmount} = JSON.parse(sessionStorage.getItem("transferDetails"));
//   const {phoneNumber, email} = JSON.parse(sessionStorage.getItem("recepientDetails"));
  const [show, setShow] = useState(false); 
  const handleClose = () => dispatch(paymentStatus());
  const handleShow = () => setShow(true);
  const [transactions, setTransactions] = useState(null);
  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(false)

  const [address, setAddress] = useState('0x9A18182dAef0d99DdE8cedD817515A8Fe8491C96')

  const navigate = useNavigate()  
    // useEffect(() => {
    //     const getStatus = setInterval( async () => {
    //         const transactionid = sessionStorage.getItem("transactionId")
    //         const temp = []
    //         if (transactionid) {
    //             await firebase
    //                 .firestore().collection('transactions')
    //                 .doc(transactionid)
    //                 .onSnapshot((doc) => {
    //                     temp.push(doc.data())
    //                     setTransactions(temp)
    //                     if (transactions && transactions[0].status === true) {
    //                         const date = new Date(transactions[0].date.toDate()).toDateString()
    //                         const body = `Your transaction with ID number: ${transactionid} on padipay was successful.`
    //                         const phone_number = `+${phoneNumber}`
    //                         sendSms(phone_number, body)
    //                         transactSuccessEmail(email, sendAmount, receiveAmount, tokenValue, date, transactionid)
    //                         console.log("status has changed")
    //                         setSuccess(true)
    //                         sessionStorage.setItem("success", true)
    //                         navigate('/success-transact')
    //                     }
    //                 })         
    //             }
    //     }, 5000);
    //     return () => clearInterval(getStatus)
    // }, [transactions])  
    return (  
        <>
      <Modal
        show={open}
        onHide={payment}
        backdrop="static"
        keyboard={false}
        centered={true}
        contentClassName="modal-content"
      >
        
        <Modal.Body
        bsPrefix="modal-body"
        >
            <>
                <div className="modal-heading">
                    <p> <BiStopwatch size={20} style={{fill: 'white'}}/> Time remaining for your payment</p>
                    <CountdownTimer />
                </div>
                <div className="modal-info">
                    <p>Complete your transaction by sending to the address below</p>
                </div>
                {/* <div className="amount-due">
                    <p>{`Amount Due `}</p>
                </div> */}
                <div className="barcode">
                    <QRCode 
                    value="0x9A18182dAef0d99DdE8cedD817515A8Fe8491C96"
                    logoHeight={100}
                    logoWidth={100}/>
                </div>
                <div className="address">
                    <span>Address</span>
                </div>
                <div className="address-details">
                    <p>{`${address.substring(0, 25)}...`}</p> 
                    <RiFileCopyLine size={25} style={{fill: 'white', marginTop: 10, marginRight:10}}/>
                </div>
                <div className="address">
                    <span>Amount Due</span>
                </div>
                <div className="address-details">
                    <p>{`${transfer.sendAmount} ${transfer.tokenValue}`}</p> 
                    <RiFileCopyLine size={25} style={{fill: 'white', marginTop: 10, marginRight:10}}/>
                </div>
                {/* <Link className="link" to="" onClick={handleClose}>
                    <div className="cancel">
                        <p><MdOutlineClose size={20} style={{fill: 'red'}}/> Cancel Payment transaction</p>
                    </div>
                </Link> */}
                <div className="logo-bottom">
                    <img src={logo} alt="" />
                </div>
            </>
        </Modal.Body>
      </Modal>
        </>
    );
}

export default PaymentDetails;