import React, {} from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const RefreshRoute = ({children:Component}) => {
    const {active} = useSelector(state => state.transfer_details)

    return ( 
        active !== false ? Component : <Navigate to="/send"/>
     );
}

export default RefreshRoute;
