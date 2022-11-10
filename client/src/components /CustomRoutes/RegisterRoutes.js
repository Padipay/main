import React, {  } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function RegisterRoutes({ children:Component, ...otherProps}) {
    const {auth_user } = useSelector(state => state.auth_details)
    return ( 
        Object.keys(auth_user).length > 0 ? Component : <Navigate to="/register"/>
     );
}

export default RegisterRoutes;