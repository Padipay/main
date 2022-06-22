import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import firebase from '../firebase/firebase';


function PrivateRoute({ children:Component, ...otherProps}) {
    // const [isAuthenticated, setIsAuthenticated ] = useState(null);
    const isAuthenticated = sessionStorage.getItem('Auth-Token')
    const activeTransaction = sessionStorage.getItem('transferDetails')
    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             user.getIdToken().then(function(idToken) {  // <------ Check this line
    //                 sessionStorage.setItem('Auth-Token', idToken) // It shows the Firebase token now
    //              });
    //           } else {
    //             setIsAuthenticated(null)
    //           }
    //     })
    // }, [])
    return (  
        isAuthenticated || activeTransaction ? Component : <Navigate to="/"/>
    );
}

export default PrivateRoute;
