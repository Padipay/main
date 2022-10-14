import { useState } from "react";
import '../styles/modal.css';
import '../styles/homepage.css';
import Modal from 'react-bootstrap/Modal';
// import '../styles/modal.css';
import logo from '../images/Logo.png'
import { FiAlertCircle } from "react-icons/fi";

function TimeOutModal({open}) {
    const [close, setClose] = useState(false);
    const handleClose = () => {
        window.location.reload()
        setClose(true)
    }
    return ( 
        <>
            <Modal
            show={open}
            onHide={close}
            backdrop="static"
            keyboard={false}
            centered={true}
            contentClassName="modal-content-time-out"
             >
        <Modal.Body
        bsPrefix="modal-body"
        >
            <>
                <div className="time-out">
                    <FiAlertCircle size={60} style={{fill: 'white', marginTop: 10}}/>
                    <h4>Transaction timeout</h4>
                    <span>We didn't receive any transfer before the transaction timed-out. Not to worry if the transfer was done, you will definitely get credited to the receiving account.”
“                           help@padipay.io for any further assistance. Thank you!
                    </span>

                    <span>You can contact help@padipay.io for any further assistance</span>
                    <div className="send-btn">
                        <button type="submit" 
                        className="btn btn-primary btn-lg mt-3" onClick={handleClose}>Continue</button>
                    </div>    
                </div>
                <div className="logo-bottom-time-out">
                    <img src={logo} alt="" />
                </div>
            </>
        </Modal.Body>
      </Modal>
        </>
     );
}

export default TimeOutModal;