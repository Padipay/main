import React from "react";
import '../styles/dashboard.css';
import DashboardContentLayout from "./dashboardContentLayout";
import { AiOutlineRise } from "react-icons/ai";
import empty from '../images/empty.png';

function DashboardOverview() {
    return ( 
        <>
            <DashboardContentLayout title="Account Overview">
                <div>
                    <div className="total-transaction-card">
                        <div className="items">
                            <div className="transaction-icon mb-3">
                                <AiOutlineRise size={25} style={{fill: '#FFFFFF'}}/>
                            </div>
                            <h3 className="mb-3">0.00</h3>
                            <p className="total-transaction-info">Total Transaction</p>
                        </div>
                    </div>
                </div>
            </DashboardContentLayout>

            <DashboardContentLayout title="Recent Transactions">
                <div className="empty-transaction">
                    <img src={empty} alt="empty-image" />
                    <p>There are no activities here</p>
                </div>
            </DashboardContentLayout>
        </>
     );
}

export default DashboardOverview;