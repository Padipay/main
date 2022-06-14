import React, { useState } from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import '../styles/createAccount.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import firebase from '../firebase/firebase'

function Login() {
    const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const onSubmit = ({email, password}) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                navigate('/dashboard')
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
                    navigate('/dashboard')
                })
                .catch((error) => {
                    console.log(error.message)
                })
            })
            .catch((error) => {
                console.log(error.message)
        })
    }

    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo}>
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
                    <div className="additional-info">
                        <p>Already have an account? 
                            <Link to="/account">
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
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Sign in</button>
                    </div>
                </form>
            </FormContainerLayout>
        </div>
     );
}

export default Login;