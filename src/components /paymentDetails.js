import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import '../styles/modal.css';
import logo from '../images/Logo2.png'
import { QRCode } from 'react-qrcode-logo';

import { MdOutlineClose } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";
import { BiStopwatch } from "react-icons/bi";

import Countdown from 'react-countdown';
import { Link, useNavigate } from "react-router-dom";

import firebase from '../firebase/firebase';
import { transactSuccessEmail } from "../api/transactionSuccessEmail";

function PaymentDetails({open}) {
  const {tokenValue, sendAmount, receiveAmount} = JSON.parse(sessionStorage.getItem("transferDetails"));
  const {email} = JSON.parse(sessionStorage.getItem("recepientDetails"));
  const [show, setShow] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [transactions, setTransactions] = useState(null);
  const [status, setStatus] = useState(null);

  const [address, setAddress] = useState('0x9A18182dAef0d99DdE8cedD817515A8Fe8491C96')

  const navigate = useNavigate()
  
  // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
        // Render a completed state
        return navigate("/"), sessionStorage.clear()
        } else {
        // Render a countdown
        return <span className="timer">{minutes}:{seconds}</span>;
        }
    };

    useEffect(() => {
        const getStatus = async () => {
            const transactionid = sessionStorage.getItem("transactionId")
            const temp = []
            if (transactionid) {
                firebase
                    .firestore().collection('transactions')
                    .doc(transactionid)
                    .onSnapshot((doc) => {
                        temp.push(doc.data())
                        setTransactions(temp)
                        if (transactions && transactions[0].status === 'Successful') {
                            const date = new Date(transactions[0].date.toDate()).toDateString()
                            transactSuccessEmail(email, sendAmount, receiveAmount, tokenValue, date)
                            navigate('/dashboard')
                        }
                    })         
                }
        }
        getStatus()
    }, [transactions])

    // useEffect(() => {
    //     const transactionid = sessionStorage.getItem("transactionId")
    //     const temp = []
    //     const getStatus = async () => firebase
    //                     .firestore().collection('transactions')
    //                         .where("id", "==", transactionid)
    //                         .get()
    //                         .then((querySnapshot) => {
    //                         if (querySnapshot.empty) {
    //                             setStatus(false)
    //                         }
    //                         querySnapshot.forEach((doc) => {
    //                             const data = {
    //                                 data: doc.data()
    //                             }
    //                             temp.push(data)
    //                             setTransactions(temp)
    //                             // console.log(transactions[0].data.status)
                                
    //                             if (transactions[0].data.status === 'Successful') {
    //                                 const date = new Date(transactions[0].data.date.toDate()).toDateString()
    //                                 setStatus(true)
    //                                 navigate('/dashboard')
    //                                 transactSuccessEmail(email, sendAmount, receiveAmount, tokenValue, date)
    //                             }
    //                         })
    //                     }).catch((err) => {
    //                         console.log(err.message)
    //                     })
    //         const refresh = () => {
    //             setTimeout(() => {
    //                 getStatus()
    //             }, 6000);
    //         }            
    //         refresh()
    //         return () => clearTimeout(refresh())
    // }, [transactions])

    // console.log(transactions)
    
    return (  
        <>
      <Modal
        show={open}
        onHide={handleClose}
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
                    <Countdown date={Date.now() + 600000}  renderer={renderer}/>
                </div>
                <div className="modal-info">
                    <p>Complete your transaction by sending to the address below</p>
                </div>
                <div className="amount-due">
                    <p>{`Amount Due ${sendAmount} ${tokenValue}`}</p>
                </div>
                <div className="barcode">
                    <QRCode 
                    value="0x9A18182dAef0d99DdE8cedD817515A8Fe8491C96"/>
                </div>
                <div className="address">
                    <p>Address</p>
                </div>
                <div className="address-details">
                    <p>{`${address.substring(0, 25)}...`}</p> 
                    <RiFileCopyLine size={25} style={{fill: 'white', marginTop: 10, marginRight:10}}/>
                </div>
                <Link className="link" to="/">
                    <div className="cancel">
                        <p><MdOutlineClose size={20} style={{fill: 'red'}}/> Cancel Payment transaction</p>
                    </div>
                </Link>
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