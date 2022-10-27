import React, { useEffect, useState } from "react";
import FormContainerLayoutTwo from "../Layouts/formContainerLayoutTwo";
import Logo from '../../images/Logo.png';
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import firebase from '../../firebase/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { sendVerificationEmail } from "../../utils/sendEmail";
import styled from "styled-components";
import { StyledError, LargeSpinner } from "../../styles/globalStyles";
import {useLocation} from 'react-router-dom';
import { signUp, authError } from "../../redux/auth/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from '../Layouts/button';

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
    const {loading, error, verify_error, auth_user, verify_auth } = useSelector(state => state.auth_details)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const onSubmit = ({password}) => {
        dispatch(signUp(auth_user.email, password, auth_user.fname, auth_user.lname, navigate))
    }

    useEffect(() => {
        dispatch(authError(null))
    }, [])
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
                    {error && <p className="errors mt-3">{error}</p>}
                    <CustomButton title="Sign Up"/>
                </form>
                
            </FormContainerLayoutTwo>
        </div>
     );
}

export default CreatePassword;