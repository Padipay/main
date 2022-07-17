import React, { useState } from "react";
import FormContainerLayoutTwo from "./formContainerLayoutTwo";
import Logo from '../images/Logo.png';
import '../styles/resetPassword.css';
import { useNavigate } from "react-router";
import { sendVerificationEmail } from "../api/sendEmail";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


const schema  = yup.object({
    email: yup.string()
    .email("Enter recepient email")
    .required("Please enter a valid email"),
}).required();

function ResendVerificationEmail() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const[email, setEmail] = useState('')
    const[success, setSucccess] = useState(true)
    const navigate = useNavigate();


    const onSubmit = async() => {
        await sendVerificationEmail(email)
        toast.success("An email has been sent to the associated account!", {
            position: toast.POSITION.TOP_RIGHT,
            onClose: () => navigate('/login')
            });
    }
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayoutTwo image={Logo} type="account">
                <form onSubmit={handleSubmit(onSubmit)}>    
                    <h4 className="create-header-title">Reset Password</h4>
                    <p className="reset-info">Please enter the email associated with your account to reset your password.</p>
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        {...register("email")}
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    {<p className="errors">{errors.email?.message}</p>}
                    <div className="send-btn">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Verify Email</button>
                    </div>
                </form>
                <ToastContainer />
            </FormContainerLayoutTwo>
        </div>
     );
}

export default ResendVerificationEmail;