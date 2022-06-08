import React, { useEffect, useState } from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import '../styles/createAccount.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import firebase from '../firebase/firebase';
import { sendVerificationEmail } from "../api/sendEmail";
import Spinner from 'react-spinkit';

function CreateAccount() {
    const { register, handleSubmit, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    const [error, setError ] = useState('')
    const [loading, setLoading ] = useState(false)

    const onSubmit = ({email, password, username}) => {
        setLoading(true)
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                sendVerificationEmail(email, username)
                response.user.getIdToken().then(function(idToken) { 
                    sessionStorage.setItem('Auth-Token', idToken)
                 });
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set({email, username})
                    .then(() => {
                        setLoading(false)
                        navigate('/verify', {state: {email: email}})
                    })
                    .catch((error) => {
                        setError(error.message) 
                    })
            })
        .catch((error) => {
            console.log(error.message)
            setError('This email is already in use by another account') 
            setLoading(false)
        }); 
    }

    return (

        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo}>
                <h4 className="create-header-title">Create an Account</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="email" 
                        className="form-control" 
                        id="floatingInput1" 
                        placeholder="name@example.com" 
                        {...register("email", {required: true})}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    { errors.email && <p className="errors mt-3">Please email is required</p>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingPassword2" 
                        placeholder="Username" 
                        {...register("username", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Username</label>
                    </div>
                    { errors.username && <p className="errors mt-3">Please username is required</p>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword3" 
                        placeholder="Password" 
                        {...register("password", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    { errors.password && <p className="errors mt-3">Enter a valid password</p>}
                    {error && <p className="errors mt-3">{error}</p>}
                    <div className="additional-info">
                        <p>Already have an account? 
                            <Link to="/login">
                                <span>Login</span>
                            </Link>
                        </p>
                    </div>
                    <div className="send-btn">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">
                            Next
                            <span className="loading-spinner">{loading && <Spinner name="three-bounce"/> }</span>
                        </button>
                    </div>
                </form>
            </FormContainerLayout>
        </div>
    );
}

export default CreateAccount;