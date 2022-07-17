import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children:Component, ...otherProps}) {
    // const [isAuthenticated, setIsAuthenticated ] = useState(null);
    const isAuthenticated = sessionStorage.getItem('Auth-Token')
    return (  
        isAuthenticated ? Component : <Navigate to="/"/>
    );
}

export default PrivateRoute;
