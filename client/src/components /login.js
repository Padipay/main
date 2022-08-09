import React, { useState } from "react";
import FormContainerLayoutTwo from "./formContainerLayoutTwo";
import Logo from '../images/Logo.png';
import '../styles/createAccount.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import firebase from '../firebase/firebase';
import { StyledError, LargeSpinner } from "../styles/globalStyles";
import styled from "styled-components";

const StyledSpinnerSpan = styled.span`
    position: absolute;
    margin-left: inherit;
    margin-top: 0px;
`

function Login() {
    const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    const [ error, setError ] = useState('')
    const [ verifyError, setVerifyError ] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = ({email, password}) => {
        setLoading(true)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                if (response.user.emailVerified === true) {
                    const uid = response.user.uid
                    response.user.getIdToken().then(function(idToken) { 
                        sessionStorage.setItem('Auth-Token', idToken)
                    });
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if(!firestoreDocument.exists) {
                            navigate('/login')
                        }
                        setLoading(false)
                        navigate('/dashboard')
                    })
                    .catch((error) => {
                        setError('User does not exist, try again')
                    })
                }else{
                    setLoading(false)
                    setVerifyError('Please verify your email address')
                }
            })
            .catch((error) => {
                setLoading(false)
                setError('Email address or password is wrong')
        })
    }

    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayoutTwo image={Logo} type="account">
                <h4 className="create-header-title">Log in to Padipay </h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com" 
                        {...register("email", {required: true})}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    { errors.email && <p className="errors mt-3">Email is required</p>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword" 
                        placeholder="Password" 
                        {...register("password", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    { errors.password && <p className="errors mt-3">Password is required</p>}
                    {error && <p className="errors mt-3">{error}</p>}
                    {verifyError &&                     
                    <Link to="/resend-email">
                        <p className="errors mt-3">{`${verifyError}. Click to resend`}</p>
                    </Link>
                     }
                    <div className="additional-info ms-4">
                        <p>Already have an account? 
                            <Link to="/register">
                                <span>Sign Up</span>
                            </Link>
                        </p>
                    </div>
                    <div className="forgot-password">
                        <Link className="link" to="/reset">
                            <p>Forgot Password ?</p>
                        </Link>
                    </div>
                    <div className="send-btn">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Sign in
                            <StyledSpinnerSpan>{loading && <LargeSpinner name="three-bounce" color="white" /> }</StyledSpinnerSpan>
                        </button>
                    </div>
                </form>
            </FormContainerLayoutTwo>
        </div>
     );
}

export default Login;