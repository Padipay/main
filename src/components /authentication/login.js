import React, { useEffect } from "react";
import FormContainerLayoutTwo from "../Layouts/formContainerLayoutTwo";
import Logo from '../../images/Logo.png';
import '../../styles/createAccount.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { LargeSpinner } from "../../styles/globalStyles";
import styled from "styled-components";
import { login, verifyError, authError } from "../../redux/auth/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from '../Layouts/button';

const StyledSpinnerSpan = styled.span`
    position: absolute;
    margin-left: inherit;
    margin-top: 0px;
`

function Login() {
    const {loading, error, verify_error } = useSelector(state => state.auth_details)
    const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const onSubmit = async ({email, password}) => {
         dispatch(login(email, password, navigate)) 
    }

    useEffect(() => {
        dispatch(verifyError(null))
        dispatch(authError(null))
    }, [])
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
                    {verify_error &&                     
                    <Link to="/resend-email" className="verify-error">
                        <p className="mt-3 text-danger">{`${verify_error}. Click to resend`}</p>
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
                    <CustomButton title="Sign in"/>
                </form>
            </FormContainerLayoutTwo>
        </div>
     );
}

export default Login;