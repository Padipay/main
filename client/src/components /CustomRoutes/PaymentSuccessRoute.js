import React from "react";
import { Navigate } from "react-router-dom";

function PaymentSuccess({ children:Component, ...otherProps}) {
    // const [isAuthenticated, setIsAuthenticated ] = useState(null);
    const isSuccessful = sessionStorage.getItem('success')
    return (  
        isSuccessful ? Component : <Navigate to="/"/>
    );
}

export default PaymentSuccess;
