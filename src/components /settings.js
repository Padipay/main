import React from "react";
import '../styles/dashboard.css';
import CustomButton from "./button";
import DashboardContentLayout from "./dashboardContentLayout";

function Settings() {
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
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput1" placeholder="@maria_xx" />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput2" placeholder="Enter legal full name" />
                                    <label htmlFor="floatingInput">Enter legal full name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput3" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <CustomButton
                                title="Save Changes"
                                />
                                
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade mt-5" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className="row">
                            <div className="col-lg-4 col-sm-12">
                                <h4>Change Password</h4>
                                <p>Update your account password below</p>
                            </div>
                            <div className="col-lg-6 col-sm-12">
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
                                {/* <button type="submit" className="btn btn-primary btn-lg mt-3">Save Changes</button> */}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardContentLayout>
        </>
     );
}

export default Settings;