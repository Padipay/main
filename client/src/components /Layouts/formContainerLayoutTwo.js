import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Layouts/formContainer.css';
import { StyledMainFormContainer } from "../../styles/globalStyles";
import { BsArrowLeft } from "react-icons/bs";
import { toggleLoading } from "../../redux/transfer/actions/actions";
import { useDispatch } from "react-redux";

function FormContainerLayoutTwo({children, title, image, type}) {
    const dispatch = useDispatch();

    return ( 
        <div>
            {title && <h4 className="send-info">{title}</h4>}
            <div className="mb-4">
                {/* <BsArrowLeft size={30} className="back-button" onClick={() => navigate(-1)}/> */}
                <Link to="/" className="container-image" onClick={() => dispatch(toggleLoading())}>
                {image && <img src={image} alt="Logo" />}
                </Link>
            </div>
            
            <StyledMainFormContainer account={type}>
                {children}
            </StyledMainFormContainer>
        </div>
     );
}

export default FormContainerLayoutTwo;