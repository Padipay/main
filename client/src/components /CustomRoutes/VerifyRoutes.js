import React, {  } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function VerifyRoutes({ children:Component, ...otherProps}) {
    const {verify_auth } = useSelector(state => state.auth_details)
    return ( 
        verify_auth != false ? Component : <Navigate to="/register"/>
     );
}

export default VerifyRoutes;