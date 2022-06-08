import React from "react";
import verify from '../images/verify.png';
import FormContainerLayout from "./formContainerLayout";
import Logo from '../images/Logo.png';

function NotFound() {
    return ( 
        <div className="d-flex align-items-center justify-content-center vh-100 verify">
            <FormContainerLayout image={Logo}>
                {/* <img className="image-verify" src={verify} alt="image" /> */}
                <h1 style={{color: '#003399'}}>404 Error</h1>
                <p>Not Found</p>
                <p>The page you requested was not found.</p>
            </FormContainerLayout>
        </div>
     );
}

export default NotFound;