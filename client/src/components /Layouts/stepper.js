import React, { useState } from 'react';
import '../../styles/Layouts/stepper.css';
import { Link } from 'react-router-dom';

function Stepper({page_num}) {
    const [page, setPage ] = useState(page_num);
    return ( 
        <>
            <div className="row content">
                <div className="col-lg-1 col-sm-1">
                    <div className="progress">
                        <div className="step" style={{ height: page_num === 0 ? "30%" : page_num === 1 ? "40%" : page_num === 2 ? "80%" : page_num === 3 ? "100%" : "0%"}}></div>
                    </div>
                </div>
                <div className="col-lg-9 col-sm-3">
                    <div className="item-list-active mb-4">
                        <Link className="link" to="/send">
                            <p>Amount to Send</p>
                        </Link>
                    </div>
                    <div className="item-list mb-4">
                        <p style={{fontWeight: page_num === 1 ? 700 : page_num === 2 ? 700 : page_num === 3 ? 700 : 400 }}>Recipient Details</p>
                    </div>
                    <div className="item-list mb-4">
                        <p style={{fontWeight: page_num === 2 ? 700 : page_num === 3 ? 700 : 400 }}>Transaction Review</p>
                    </div>
                    <div className="item-list">
                        <p style={{fontWeight: page_num === 3 ? 700 : 400 }}>Complete Transaction</p>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Stepper;