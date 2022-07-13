import React from "react";
import { Link } from "react-router-dom";
import '../styles/formContainer.css';
import { StyledMainContentContainer, StyledMainFormContainer } from "../styles/globalStyles";
import styled from "styled-components";

const FormContainer = styled(StyledMainFormContainer)`
    width: 464px
`

function FormContainerLayout({children, title, image, type}) {
    return ( 
        <>
        <StyledMainContentContainer account={type}>
            {title && <h4 className="send-info">{title}</h4>}
            <Link to="/" className="container-image mb-4">
                {image && <img src={image} alt="Logo" />}
            </Link>
            <FormContainer account={type}>
                {children}
            </FormContainer>
        </StyledMainContentContainer>
        </>
     );
}

export default FormContainerLayout;