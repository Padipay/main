import React, { useState } from "react";
import FormContainerLayoutTwo from "../Layouts/formContainerLayoutTwo";
import Logo from '../../images/Logo.png'
import '../../styles/createAccount.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { StyledError } from "../../styles/globalStyles";
import { authUser } from "../../redux/auth/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from '../Layouts/button';

const StyledSpinnerSpan = styled.span`
    position: absolute;
    margin-left: inherit;
    margin-top: 0px;
`

function CreateAccount() {
    const {auth_user } = useSelector(state => state.auth_details)
    const [fname, setFname] = useState('' || auth_user.fname)
    const [lname, setLname] = useState('' || auth_user.lname)
    const [email, setEmail] = useState('' || auth_user.email)

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onSubmit = ({fname, lname, email}) => {
        navigate('/password')
        const data = {
            fname,
            lname,
            email
        }
        dispatch(authUser(data))
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <FormContainerLayoutTwo image={Logo} type="account">
                <h4 className="create-header-title">Create an Account</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInputfname" 
                        {...register("fname", {required: true, onChange:(e) => setFname(e.target.value)})}
                        value={fname || ''}
                        />
                        <label htmlFor="floatingInput">First Name</label>
                    </div>
                    { errors.fname && <StyledError>First Name is required</StyledError>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInputlname" 
                        {...register("lname", {required: true, onChange:(e) => setLname(e.target.value)})}
                        value={lname || ''}
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
                        {...register("email", {required: true, onChange:(e) => setEmail(e.target.value)})}
                        value={email || ''}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    { errors.email && <StyledError>Please email is required</StyledError>}
                    <div className="additional-info text-center">
                        <p>Already have an account? 
                            <Link to="/login">
                                <span>Login</span>
                            </Link>
                        </p>
                    </div>
                    <CustomButton title="Next"/>
                </form>
            </FormContainerLayoutTwo>
        </div>
    );
}

export default CreateAccount;