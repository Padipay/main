import React, { useState } from "react";
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';
import '../styles/createAccount.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import firebase from '../firebase/firebase';
import { sendVerificationEmail } from "../api/sendEmail";
import styled from "styled-components";
import { StyledError, LargeSpinner } from "../styles/globalStyles";

const StyledSpinnerSpan = styled.span`
    position: absolute;
    margin-left: inherit;
    margin-top: 0px;
`

function CreateAccount() {
    const { register, handleSubmit, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    // const [error, setError ] = useState('')
    // const [loading, setLoading ] = useState(false)

    const onSubmit = ({fname, lname, email}) => {
        navigate('/password', {state: {email: email, firstname: fname, lastname:lname}})
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayout image={Logo} type="account">
                <h4 className="create-header-title">Create an Account</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInputfname" 
                        {...register("fname", {required: true})}
                        />
                        <label htmlFor="floatingInput">First Name</label>
                    </div>
                    { errors.email && <StyledError>First Name is required</StyledError>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInputlname" 
                        {...register("lname", {required: true})}
                        />
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>
                    { errors.lname && <StyledError>Last name is required</StyledError>}
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
                    { errors.email && <StyledError>Please email is required</StyledError>}
                    {/* <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingPassword2" 
                        placeholder="Username" 
                        {...register("username", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Username</label>
                    </div> */}
                    { errors.username && <StyledError>Please username is required</StyledError>}
                    {/* <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword3" 
                        placeholder="Password" 
                        {...register("password", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div> 
                    { errors.password && <StyledError>Enter a valid password</StyledError>}*/}
                    {/* {error && <p className="errors mt-3">{error}</p>} */}
                    <div className="additional-info text-center">
                        <p>Already have an account? 
                            <Link to="/login">
                                <span>Login</span>
                            </Link>
                        </p>
                    </div>
                    <div className="send-btn">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">
                            Next
                            {/* <StyledSpinnerSpan>{loading && <LargeSpinner name="three-bounce" color="white" /> }</StyledSpinnerSpan> */}
                        </button>
                    </div>
                </form>
            </FormContainerLayout>
        </div>
    );
}

export default CreateAccount;