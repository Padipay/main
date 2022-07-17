import React from "react";
import '../styles/button.css';

function CustomButton({title, style}) {
    return (  
        <>
            <button type="submit" className="btn btn-primary btn-lg mb-5 mt-3 main-btn" style={style}>{title}</button>
        </>
    );
}

export default CustomButton;