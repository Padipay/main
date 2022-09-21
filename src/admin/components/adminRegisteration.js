import React, { useState } from "react";
import FormContainerLayout from "../../components /formContainerLayout";
import FormContainerLayoutTwo from "../../components /formContainerLayoutTwo";
import Logo from '../../images/Logo.png';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { StyledError, LargeSpinner } from "../../styles/globalStyles";

const StyledSpinnerSpan = styled.span`
    position: absolute;
    margin-left: inherit;
    margin-top: 0px;
`

function AdminRegister() {
    const [loading, setLoading ] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({});

    const onSubmit = ({email, password}) => {

    }

    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayoutTwo image={Logo} type="account">
                <h4 className="create-header-title">Register Admin Account</h4>
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
                    { errors.email && <StyledError>Email is required</StyledError>}
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
                    { errors.password && <StyledError>Enter a valid password</StyledError>}
                    {/* {error && <p className="errors mt-3">{error}</p>} */}
                    <div className="additional-info ms-4">
                        <p>Already have an account? 
                            <Link to="/login">
                                <span>Login</span>
                            </Link>
                        </p>
                    </div>
                    <div className="send-btn">
                        <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3">
                            Register
                            <StyledSpinnerSpan>{loading && <LargeSpinner name="three-bounce" color="white" /> }</StyledSpinnerSpan>
                        </button>
                    </div>
                </form>
            </FormContainerLayoutTwo>
        </div>
     );
}

export default AdminRegister;