import React from "react";
import '../styles/dashboard.css';
import empty from '../images/empty.png';

function EmptyTransaction() {
    return ( 
        <div className="empty-transaction">
            <img src={empty} alt="empty-image" />
            <p>There are no activities here</p>
        </div>
     );
}

export default EmptyTransaction;