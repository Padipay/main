import React, { useEffect, useState } from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import verify from '../images/verify.png';
import '../styles/verify.css';
import { Link } from "react-router-dom";
import firebase from '../firebase/firebase';
import Spinner from 'react-spinkit';


function VerifyEmail({actionCode}) {
    const [error, setError ] = useState('');
    const [validCode, setValidCode ] = useState(null);
    const [verifiedCode, setVerifiedCode ] = useState(true);

    useEffect(() => {
        firebase.auth().applyActionCode(actionCode)
        .then(() => {
            setValidCode(true)
            setVerifiedCode(true)
        }).catch((err) => {
            setError(err.message)
            setValidCode(false)
            setVerifiedCode(true)
        });
    }, [])

    return ( 
        <>
        { verifiedCode && validCode === 'true' ? 
        <div className="d-flex align-items-center justify-content-center vh-100 verify">
            <FormContainerLayout image={Logo}>
                <img className="image-verify" src={verify} alt="image" />
                <h4>Verified</h4>
                <p>Thank you for verifying your email address.</p>
                <p>Click the continue button below to login to your account.</p>
                <div className="send-btn">
                    <Link className="link" to="/login">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Continue</button>
                    </Link>
                </div>
            </FormContainerLayout>
        </div> : 
        <div className="errorClass">
            <h1>Try verifying your email again</h1>
            <p className="error">{error}</p>
        </div>
        }
    </>
    );
}

export default VerifyEmail;