import React, { useEffect, useState } from "react";
import '../../styles/authentication/dashboard.css';
import CustomButton from "../Layouts/button";
import DashboardContentLayout from "./dashboardContentLayout";
import SideNavbar from './SideNavbar'
import firebase from '../../firebase/firebase';
import { useForm } from "react-hook-form";
import { StyledError } from "../../styles/globalStyles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardInfo from "./DashboardInfo";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/auth/actions/actions";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import { editProfile } from "../../redux/auth/actions/actions";

function Settings() {
    const[user, setUser] = useState(null)
    const[loading, setLoading] = useState(false)
    const { register, reset, handleSubmit, formState: { errors } } = useForm({});
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        // dispatch(getUser())
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.firestore().collection('users')
                .doc(user.uid)
                .get()
                .then((doc) => {
                   setUser(doc.data())
                   setLoading(false)
                })
            }
        })
    }, [])

    useEffect(() => {
        reset(user);
    }, [user])

    const onSubmit = async({FirstName, LastName}) => {
        await dispatch(editProfile(FirstName, LastName, toast))
        dispatch(getUser())
    }

    return ( 
        <>
            <div className="home-page">
                <div className="container-fluid dashboard-container">
                    <div className="row">
                        <SideNavbar />
                        <div className="col-lg-9 col-sm-12 col-md-12 ms-lg-5">
                            <DashboardInfo />
                            <div className="dashboard-container">
                            {loading === true ? 
                                <Skeleton 
                                height={400} 
                                style={{marginBottom: 20, marginTop: 20, width: '100%'}}
                                /> 
                                :
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
                                                                {...register("FirstName" , {required: true})}
                                                                className="form-control" 
                                                                id="floatingInput1" 
                                                                placeholder="First Name" 
                                                                />
                                                                <label htmlFor="floatingInput">First Name</label>
                                                            </div>
                                                            { errors.fname && <StyledError>First Name is required</StyledError>}
                                                            <div className="form-floating mb-3">
                                                                <input 
                                                                {...register("LastName" , {required: true})}
                                                                type="text" 
                                                                className="form-control" 
                                                                id="floatingInput2" 
                                                                placeholder="Last Name" 
                                                                />
                                                                <label htmlFor="floatingInput">Last Name</label>
                                                            </div>
                                                            {/* { errors.lname && <StyledError>Last name is required</StyledError>} */}
                                                            <div className="form-floating mb-3">
                                                                <input 
                                                                {...register("Email" , {required: true})}
                                                                type="email" 
                                                                className="form-control" 
                                                                id="floatingInput3" 
                                                                placeholder="name@example.com" readOnly
                                                                />
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ToastContainer />
                                </DashboardContentLayout>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
     );
}

export default Settings;