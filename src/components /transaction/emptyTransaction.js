import React from "react";
import '../../styles/authentication/dashboard.css';
import empty from '../../images/empty.png';

function EmptyTransaction() {
    return ( 
        <div className="empty-transaction">
            <img src={empty} alt="empty" />
            <p>There are no activities here</p>
        </div>
     );
}

export default EmptyTransaction;