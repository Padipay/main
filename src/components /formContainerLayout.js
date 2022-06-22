import React from "react";
import { Link } from "react-router-dom";
import '../styles/formContainer.css';
import { StyledMainContentContainer, StyledMainFormContainer } from "../styles/globalStyles";

function FormContainerLayout({children, title, image, type}) {
    return ( 
        <>
        <StyledMainContentContainer account={type}>
            {title && <h4 className="send-info">{title}</h4>}
            <Link to="/">
                {image && <img className="container-image" src={image} alt="Logo" />}
            </Link>
            <StyledMainFormContainer account={type}>
                {children}
            </StyledMainFormContainer>
        </StyledMainContentContainer>
        </>
     );
}

export default FormContainerLayout;