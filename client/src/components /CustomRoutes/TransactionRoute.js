import React from "react";
import { Navigate } from "react-router-dom";

function TransactionRoute({ children:Component, ...otherProps}) {
    const activeTransaction = sessionStorage.getItem('transferDetails')

    return ( 
        activeTransaction ? Component : <Navigate to="/"/>
     );
}

export default TransactionRoute;