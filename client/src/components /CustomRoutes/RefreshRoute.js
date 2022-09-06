import React, {useCallback, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import PaymentDetails from '../paymentDetails';

const RefreshRoute = ({children:Component, ...otherProps}) => {
    const {active, payment} = useSelector(state => state.transfer_details)

    return ( 
        active != false ? Component : <Navigate to="/send"/>
     );
}

export default RefreshRoute;
