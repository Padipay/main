import React from "react";
import '../../styles/Layouts/button.css';
import styled from "styled-components";
import { LargeSpinner } from "../../styles/globalStyles";
import { useSelector } from "react-redux";

const StyledSpinnerSpan = styled.span`
    position: absolute;
    margin-left: inherit;
    margin-top: 0px;
`

function CustomButton({title, style}) {
    const{loading} = useSelector(state => state.auth_details)
    return (  
        <>
            <div className="send-btn">
                <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3" disabled={loading}>
                    {title}
                    <StyledSpinnerSpan>{loading && <LargeSpinner name="three-bounce" color="white" /> }</StyledSpinnerSpan>
                </button>
            </div>
            {/* <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3 main-btn" style={style}>{title}</button> */}
        </>
    );
}

export default CustomButton;