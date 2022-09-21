import React from "react";
import { Link } from "react-router-dom";
import '../styles/formContainer.css';
import { StyledMainContentContainer, StyledMainFormContainer } from "../styles/globalStyles";

function FormContainerLayoutTwo({children, title, image, type}) {
    return ( 
        <div>
        {title && <h4 className="send-info">{title}</h4>}
        <Link to="/" className="container-image mb-4">
            {image && <img src={image} alt="Logo" />}
        </Link>
        <StyledMainFormContainer account={type}>
            {children}
        </StyledMainFormContainer>
        </div>
     );
}

export default FormContainerLayoutTwo;