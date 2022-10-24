import React, {  } from "react";
import '../../styles/dashboard.css';
import DashboardContentLayout from "./dashboardContentLayout";
import { AiOutlineRise } from "react-icons/ai";
import TransactionList from "../transaction/TransactionList";
import { useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

function DashboardOverview() {
    const {transactions, loading} = useSelector(state => state.auth_details)
    return ( 
        <>  
            {loading === true ? 
                <Skeleton 
                height={150} 
                style={{marginBottom: 20, marginTop: 20, width: '100%'}}
                />
                :
                <DashboardContentLayout title="Account Overview">
                    <div className="card-view">
                        <div className="total-transaction-card">
                            <div className="items">
                                <div className="transaction-icon mb-3">
                                    <AiOutlineRise size={25} style={{fill: '#FFFFFF'}}/>
                                </div>
                                <h3 className="mb-3">{transactions.length}</h3>
                                <p className="total-transaction-info">Total Transaction</p>
                            </div>
                        </div>
                    </div>
                </DashboardContentLayout>
            }
            <DashboardContentLayout title="Recent Transactions">
                <TransactionList />
            </DashboardContentLayout>
        </>
     );
}

export default DashboardOverview;