import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import '../../styles/Layouts/modal.css';
import logo from '../../images/Logo2.png'
import { QRCode } from 'react-qrcode-logo';

import { RiFileCopyLine } from "react-icons/ri";
import { BiStopwatch } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import { transactSuccessEmail } from "../../utils/transactionSuccessEmail";
import CountdownTimer from '../Layouts/countdownTimer';
import { useDispatch, useSelector } from "react-redux";
import { endTimer } from "../../redux/transfer/actions/actions";
import { payout, getCryptoPayment, getCryptoPaymentBEP20 } from "../../utils/api";
import { savePayment, userTransaction } from "../../utils/savePayment";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastNotification } from "../../utils/toasts";
import firebase from '../../firebase/firebase';
import { MdOutlineClose } from "react-icons/md";

function PaymentDetails({open}) {
    const dispatch = useDispatch();
    const { payment_status, transfer, recepient, payment_timestamp } = useSelector(state => state.transfer_details)
  const [, setShow] = useState(false); 
  const handleClose = () => {
        window.location.reload()
    };
//   const handleShow = () => setShow(true);
//   const [transactions, setTransactions] = useState(null);
//   const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false)
  const [intervalID, setIntervalID] = useState(0);

  const[address] = useState('0x78565af8DEfD0217EAd6723999D31aeaA763b848')
  const navigate = useNavigate()  
  const customer_ref = "PP_" + Math.floor(Math.random() * 5000000000)
  const date = new Date().toLocaleString()

  const usdt = (resolve, reject) => resolve(getCryptoPaymentBEP20('0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'))
  const eth =  (resolve, reject) => resolve(getCryptoPaymentBEP20('0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378'))
  const busd = (resolve, reject) => resolve(getCryptoPaymentBEP20('0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'))
  const btc = (resolve, reject) => resolve(getCryptoPaymentBEP20('0x6ce8da28e2f864420840cf74474eff5fd80e65b8'))
  const bnb =  (resolve, reject) => resolve(getCryptoPayment())

  const checkPayment = async () => {
    Promise.all([transfer.tokenValue === 'USDT' ? new Promise(usdt) : transfer.tokenValue === 'ETH' ? new Promise(eth) : 
    transfer.tokenValue === 'BUSD' ? new Promise(busd) : transfer.tokenValue === 'BNB' ? new Promise(bnb) : transfer.tokenValue === 'BTC' ?
    new Promise(btc) : ''
    ]).then((res) => {
    console.log(res[0].result[0].timeStamp)
        const response = res[0].result[0].timeStamp
        if (!(response < payment_timestamp.timestamp) && !(response > payment_timestamp.expriryTimestamp)) {
            const sentToken = res[0].result[0].value / 1000000000000000000
            const paidAmount = (res[0].result[0].value / 1000000000000000000) * transfer.rate
            setSuccess(true)
            paymentNotification(paidAmount, sentToken)
        }
   })
  }

  const paymentNotification = async (paidAmount, sentToken) => {
        await payout(recepient.email, recepient.accountName, 
            recepient.accountNumber, Number(paidAmount), customer_ref)
        .then((res) => {
            console.log(res)
            if (res.success === true) {
                if (firebase.auth().currentUser) {
                    userTransaction(customer_ref, paidAmount, sentToken, 
                        transfer.tokenValue, recepient.bankName, recepient.accountName, 
                        recepient.accountNumber)
                }else {
                    savePayment(customer_ref, paidAmount, sentToken, 
                    transfer.tokenValue, recepient.bankName, recepient.accountName, 
                    recepient.accountNumber)
                }
                transactSuccessEmail(recepient.email, sentToken, 
                    paidAmount.toLocaleString(), transfer.tokenValue, date, customer_ref).then((res) => {
                        console.log(res)
                        dispatch(endTimer(null))
                        navigate('/success-transact')
                })
            }
        })
  }
      
  useEffect(() => {
    const paymentInterval = setInterval(() => {
        if (payment_status === true) checkPayment()
        }, 10000);   
        setIntervalID(paymentInterval);
  }, [payment_status])

  useEffect(() => {
    if (success) clearInterval(intervalID)
  }, [success])
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
                    <CountdownTimer />
                </div>
                <div className="modal-info">
                    <p>Complete your transaction by sending to the address below</p>
                </div>
                <div className="barcode">
                    <QRCode 
                    value="0x9A18182dAef0d99DdE8cedD817515A8Fe8491C96"
                    logoHeight={100}
                    logoWidth={100}
                    />
                </div>
                <div className="address">
                    <span>Address</span>
                </div>
                <div className="address-details">
                    <p>{`${address.substring(0, 25)}...`}</p> 
                    <RiFileCopyLine size={25} style={{fill: 'white', marginTop: 10, marginRight:10, cursor:"pointer"}}
                    onClick={() =>  navigator.clipboard.writeText(`${address}`, toastNotification('Copied to Clipboard'))}
                    />
                </div>
                <div className="address">
                    <span>Amount Due</span>
                </div>
                <div className="address-details">
                    <p>{`${transfer.sendAmount} ${transfer.tokenValue}`}</p> 
                    <RiFileCopyLine size={25} style={{fill: 'white', marginTop: 10, marginRight:10, cursor:"pointer"}} 
                    onClick={() =>  navigator.clipboard.writeText(`${transfer.sendAmount} ${transfer.tokenValue}`, toastNotification('Copied to Clipboard'))}/>
                </div> 
                
                    <div className="cancel" onClick={handleClose}>
                        <p><MdOutlineClose size={20} style={{fill: 'red'}}/> Cancel Payment transaction</p>
                    </div>
                
                <div className="logo-bottom">
                    <img src={logo} alt="" />
                </div>
            </>
        </Modal.Body>
      </Modal>
      <ToastContainer/>
        </>
    );
}

export default PaymentDetails;