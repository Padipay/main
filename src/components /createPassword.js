import React, { useState } from "react";
import FormContainerLayoutTwo from "./formContainerLayoutTwo";
import Logo from '../images/Logo.png';
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import firebase from '../firebase/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { sendVerificationEmail } from "../api/sendEmail";
import styled from "styled-components";
import { StyledError, LargeSpinner } from "../styles/globalStyles";
import {useLocation} from 'react-router-dom';


const StyledSpinnerSpan = styled.span`
    position: absolute;
    margin-left: inherit;
    margin-top: 0px;
`

const schema = yup.object({
    password: yup.string()
    .required('Password is required')
    .min(6, 'Password length is too short'),
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character i.e Rebecca23%"
    // ),
    confirmPassword: yup.string()
    .required('Repeat your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

function CreatePassword() {
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();
    const [error, setError ] = useState('')
    const [loading, setLoading ] = useState(false)

    const onSubmit = ({password}) => {
        setLoading(true)
        firebase.auth().createUserWithEmailAndPassword(location.state.email, password)
            .then((response) => {
                const uid = response.user.uid
                sendVerificationEmail(location.state.email, location.state.firstname)
                response.user.getIdToken().then(function(idToken) { 
                    sessionStorage.setItem('Auth-Token', idToken)
                 });
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set({
                        Email: location.state.email,
                        FirstName: location.state.firstname,
                        LastName: location.state.lastname,
                        SignUpDate: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        setLoading(false)
                        navigate('/verify', {state: {email: location.state.email}})
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
            <FormContainerLayoutTwo image={Logo} type="account">
            <h4 className="create-header-title">Enter Password</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword1" 
                        placeholder="Password" 
                        {...register("password", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {<StyledError>{errors.password?.message}</StyledError>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword2" 
                        placeholder="Password" 
                        {...register("confirmPassword", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Re-enter password</label>
                    </div>
                    {<StyledError>{errors.confirmPassword?.message}</StyledError>}
                    <div className="send-btn">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">
                            Next
                            <StyledSpinnerSpan>{loading && <LargeSpinner name="three-bounce" color="white" /> }</StyledSpinnerSpan>
                        </button>
                    </div>
                </form>
                
            </FormContainerLayoutTwo>
        </div>
     );
}

export default CreatePassword;