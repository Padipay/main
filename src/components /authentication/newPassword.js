import React, { useEffect, useState } from "react";
import FormContainerLayoutTwo from "../Layouts/formContainerLayout";
import Logo from '../../images/Logo.png';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from '../../firebase/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Spinner from 'react-spinkit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
    email: yup.string()
    .email("Enter recepient email")
    .required("Please enter a valid email"),

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

function NewPassword({actionCode}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const[email, setEmail] = useState('');
    const[newPassword, setNewPassword] = useState('');
    const[verifiedCode, setVerifiedCode] = useState(false);
    const[validCode, setValidCode] = useState(null);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const checkCode = async() => {
            setLoading(true)
            await firebase.auth().verifyPasswordResetCode(actionCode)
            .then((email) =>{
                setLoading(false)
                setEmail(email)
                setValidCode(true)
                setVerifiedCode(true)
            }).catch((err) => {
                setError(err.message)
                setValidCode(false)
                setVerifiedCode(false)
            })
        }
        checkCode()
    }, [])

    const onSubmit = async ({confirmPassword}) => {
        await firebase.auth().confirmPasswordReset(actionCode, confirmPassword)
        .then(() => {
            toast.success("Your password has been successfully reset!", {
                position: toast.POSITION.TOP_RIGHT,
                onClose: () => navigate('/login')
                });
        }).catch((err) => {
            setError(err.message)
        })
    }

    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            {loading === true ? <Spinner name="line-scale-pulse-out" color="blue"/> :
            <FormContainerLayoutTwo image={Logo} type="account">
                <h4 className="create-header-title">Create new password</h4>
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
                    {<p className="errors">{errors.email?.message}</p>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword1" 
                        placeholder="New password" 
                        {...register("password", {required: true})}
                        />
                        <label htmlFor="floatingPassword">New Password</label>
                    </div>
                    {<p className="errors">{errors.password?.message}</p>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword2" 
                        placeholder="Confirm new password" 
                        {...register("confirmPassword", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Confirm new password</label>
                    </div>
                    {<p className="errors">{errors.confirmPassword?.message}</p>}
                    <div className="send-btn">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">Update Password</button>
                    </div>
                </form>
                <ToastContainer />
            </FormContainerLayoutTwo>}
        </div>
     );
}

export default NewPassword;