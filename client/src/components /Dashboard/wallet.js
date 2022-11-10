import React, { useEffect } from "react";
import DashboardContentLayout from "./dashboardContentLayout";
import SideNavbar from "./SideNavbar";
import DashboardInfo from "./DashboardInfo";
import '../../styles/authentication/dashboard.css';
import DashboardOverview from "./dashboardOverview";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/auth/actions/actions";
import { GiWallet } from "react-icons/gi";

function Wallet() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])
    return ( 
        <>
        <div className="home-page">
            <div className="container-fluid dashboard-container">
                <div className="row">
                    <SideNavbar />
                    <div className="col-lg-9 col-sm-12 col-md-12 ms-lg-5">
                        <DashboardInfo />
                        <div className="dashboard-container">
                            <DashboardContentLayout title="Account Overview">
                                <div className="wallet-details-view">
                                    <div className="wallet-details">
                                        <div className="wallet-items">
                                            <div className="mb-3">
                                                <GiWallet size={35} style={{fill: '#00CCFF'}}/>
                                            </div>
                                            <h3 className="mb-3 fw-bold">$5000.00</h3>
                                            <p className="total-transaction-info fw-bold">Wallet Balance</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 me-3">
                                        <button className="btn btn-primary btn-lg withdraw-btn">Withdraw Money</button>
                                    </div>
                                </div>
                            </DashboardContentLayout>

                            <DashboardContentLayout title="Recent Transactions">

                            </DashboardContentLayout>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default Wallet;