import React from "react";
import '../../styles/authentication/dashboard.css';

function DashboardContentLayout({title, children}) {
    return (  
        <>
            <div className="content shadow">
                <div className="content-header">
                    <h4>{title}</h4>
                    {/* <div className="content-seperator mt-3 mb-3"></div> */}
                    {children}
                </div>
            </div>
        </>
    );
}

export default DashboardContentLayout;