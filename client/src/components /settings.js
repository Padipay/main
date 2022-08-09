import React, { useEffect, useState } from "react";
import '../styles/dashboard.css';
import CustomButton from "./button";
import DashboardContentLayout from "./dashboardContentLayout";
import firebase from '../firebase/firebase';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { StyledError, LargeSpinner } from "../styles/globalStyles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Settings() {
    const[data, setData] = useState('')
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({});
    const[loading, setLoading] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    firebase.firestore().collection('users')
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                        setData(doc.data())
                        setLoading(false)
                    })
                }
            })
            }
            getUser()
        return () => getUser()
    }, [])

    const onSubmit = ({fname, lname}) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    FirstName: fname,
                    LastName: lname
                })
                .then(() => {
                    toast.success("Your profile has been updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                        });
                })
                .catch((err) => {
                    toast.error("There was a problem updating your profile", {
                        position: toast.POSITION.TOP_RIGHT,
                        });
                })
            }
        })
    }

    return ( 
        <>
        <DashboardContentLayout>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Profile Settings</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Security</button>
                        {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> */}
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active mt-5" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="row">
                            <div className="col-lg-4 col-sm-12">
                                <h4>Personal Information</h4>
                                <p>Update your Personal Profile Information</p>
                            </div>
                                <div className="col-lg-6 col-sm-12">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-floating mb-3">
                                            <input type="text" 
                                            {...register("fname" , {required: true})}
                                            className="form-control" 
                                            id="floatingInput1" 
                                            placeholder="First Name" 
                                            defaultValue={data.FirstName || ''}
                                            />
                                            <label htmlFor="floatingInput">First Name</label>
                                        </div>
                                        { errors.fname && <StyledError>First Name is required</StyledError>}
                                        <div className="form-floating mb-3">
                                            <input 
                                            {...register("lname")}
                                            type="text" 
                                            className="form-control" 
                                            id="floatingInput2" 
                                            placeholder="Last Name" 
                                            defaultValue={data.LastName || ''}/>
                                            <label htmlFor="floatingInput">Last Name</label>
                                        </div>
                                        {/* { errors.lname && <StyledError>Last name is required</StyledError>} */}
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingInput3" placeholder="name@example.com" value={data.Email || ''} readOnly/>
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <CustomButton
                                        title="Save Changes"
                                        />
                                    </form>    
                                </div>
                        </div>
                    </div>
                    <div className="tab-pane fade mt-5" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className="row">
                            <div className="col-lg-4 col-sm-12">
                                <h4>Enable 2FA authentication</h4>
                                {/* <p>Update your account password below</p> */}
                            </div>
                            {/* <div className="col-lg-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput4" placeholder="@maria_xx" />
                                    <label htmlFor="floatingInput">Old Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput5" placeholder="Enter legal full name" />
                                    <label htmlFor="floatingInput">New Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput6" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Confirm Password</label>
                                </div>
                                <CustomButton
                                title="Save Changes"
                                />        
                            </div> */}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </DashboardContentLayout>
        </>
     );
}

export default Settings;