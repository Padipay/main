import React from "react";
import '../../styles/dashboard.css';
import { useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

function DashboardInfo() {
    const {auth_user, loading} = useSelector(state => state.auth_details);
    return ( 
        <>
            {loading === true ?
                <Skeleton 
                height={60} 
                style={{marginBottom: 20, marginTop: 20, width: '100%'}}
                /> 
                :
                <>
                    <div className="row">
                        <div className="col-6">
                            <h3 className="mt-3 link fw-bold">{`Welcome, ${auth_user.FirstName} 👋🏼`}</h3> 
                            <p>Let’s get you started with padipay</p>
                        </div>
                        <div className="col-6 dash-send-btn mt-3">
                            <Link to="/send">
                                <button className="btn btn-primary btn-lg">Send Money</button>
                            </Link>
                        </div>
                    </div>
                </>
            }    
        </>
     );
}

export default DashboardInfo;