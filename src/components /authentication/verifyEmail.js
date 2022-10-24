import React, { useEffect, useState } from "react";
import FormContainerLayoutTwo from "../Layouts/formContainerLayoutTwo";
import Logo from '../../images/Logo.png';
import verify from '../../images/verify.png';
import '../../styles/authentication/verify.css';
import { Link } from "react-router-dom";
import firebase from '../../firebase/firebase';
import Spinner from 'react-spinkit';

function VerifyEmail({actionCode}) {
    const [error, setError ] = useState('');
    const [validCode, setValidCode ] = useState(null);
    const [verifiedCode, setVerifiedCode ] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const checkCode = async () => {
            setLoading(true)
            await firebase.auth().applyActionCode(actionCode)
            .then(() => {
                setLoading(false)
                setValidCode(true)
                setVerifiedCode(true)
            }).catch((err) => {
                setLoading(false)
                setError("The link you clicked might have been expired or broken try verifying again or request a new link below")
                // setValidCode(false)
                // setVerifiedCode(false)
                console.log(err.message)
            });
        }

        checkCode()
    },[])

    return ( 
        <>
        <div className="d-flex align-items-center justify-content-center vh-100 verify">
        {loading === true ? <Spinner name="line-scale-pulse-out" color="blue"/> 
        : verifiedCode && validCode === true ?
            <FormContainerLayoutTwo image={Logo} type="account">
                <img className="image-verify" src={verify} alt="logo" />
                <h4>Verified</h4>
                <p>Thank you for verifying your email address.</p>
                <p>Click the continue button below to login to your account.</p>
                <div className="send-btn">
                    <Link className="link" to="/login">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Continue</button>
                    </Link>
                </div>
            </FormContainerLayoutTwo> :
            <FormContainerLayoutTwo image={Logo} type="account">
                <img className="image-verify" src={verify} alt="logo" />
                <h1>Oops there was a problem</h1>
                <p className="pb-4">{error}</p>
            </FormContainerLayoutTwo>
            }
        </div> 
        {/* <div className="d-flex align-items-center justify-content-center vh-100 verify">
            <FormContainerLayout image={Logo} type="account">
                <img className="image-verify" src={verify} alt="logo" />
                <h1>Oops there was a problem</h1>
                <p className="pb-4">{error}</p>
                
            </FormContainerLayout>
        </div> */}
    </>
    );
}

export default VerifyEmail;