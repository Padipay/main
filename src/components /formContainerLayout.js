import React from "react";
import { Link } from "react-router-dom";
import '../styles/formContainer.css';
function FormContainerLayout({children, title, image, style}) {
    return ( 
        <>
        <div className="col-lg-9 col-sm-10 main-content-container">
            {title && <h4 className="send-info">{title}</h4>}
            <Link to="/">
                {image && <img className="container-image" src={image} alt="Logo" />}
            </Link>
            <div className="main-form-container" style={style}>
                {children}
            </div>
        </div>
        </>
     );
}

export default FormContainerLayout;