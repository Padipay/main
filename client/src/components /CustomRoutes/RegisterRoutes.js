import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';


function RegisterRoutes({ children:Component, ...otherProps}) {
    const location = useLocation();
    return ( 
        location.state != null ? Component : <Navigate to="/"/>
     );
}

export default RegisterRoutes;