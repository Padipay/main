import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';


function RegisterRoutes({ children:Component, ...otherProps}) {
    const {signup_active } = useSelector(state => state.auth_details)
    return ( 
        signup_active != false ? Component : <Navigate to="/register"/>
     );
}

export default RegisterRoutes;