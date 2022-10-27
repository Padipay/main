import React, { useEffect, useState } from "react";
import FormContainerLayoutTwo from "../Layouts/formContainerLayoutTwo";
import Logo from '../../images/Logo.png'
import '../../styles/authentication/createAccount.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { StyledError } from "../../styles/globalStyles";
import { authUser } from "../../redux/auth/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from '../Layouts/button';

function CreateAccount() {
    const {auth_user } = useSelector(state => state.auth_details)
    const [user, setUser] = useState(null)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({});
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onSubmit = ({fname, lname, email}) => {
        const data = {
            fname,
            lname,
            email
        }
        dispatch(authUser(data))
        navigate('/password')
    }

    useEffect(() => {
        setUser(auth_user)
    }, [user])

    useEffect(() => {
        reset(user);
    }, [user])

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
                        {...register("fname", {required: true})}
                        // value={fname || ''}
                        />
                        <label htmlFor="floatingInput">First Name</label>
                    </div>
                    { errors.fname && <StyledError>First Name is required</StyledError>}
                    <div className="form-floating mb-3 me-4 ms-4">
                        <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInputlname" 
                        {...register("lname", {required: true})}
                        // value={lname || ''}
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
                        // value={email || ''}
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