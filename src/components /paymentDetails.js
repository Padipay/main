import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import '../styles/modal.css';
import logo from '../images/Logo2.png'
import { QRCode } from 'react-qrcode-logo';
import Homepage from "./hompage";

import { MdOutlineClose } from "react-icons/md";
import { RiFileCopyLine } from "react-icons/ri";
import { BiStopwatch } from "react-icons/bi";

import Countdown from 'react-countdown';
import { Link, useNavigate } from "react-router-dom";

function PaymentDetails({open}) {
  const {tokenValue, sendAmount} = JSON.parse(sessionStorage.getItem("transferDetails"));
  const [show, setShow] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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