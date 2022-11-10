import React, { useEffect } from "react";
import DashboardContentLayout from "./dashboardContentLayout";
import SideNavbar from "./SideNavbar";
import DashboardInfo from "./DashboardInfo";
import '../../styles/authentication/dashboard.css';
import Logo from '../../images/Logo3.png'
import { IoIosWifi } from "react-icons/io";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/auth/actions/actions";

function Virtualcard() {
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
                        <DashboardContentLayout title="Naira Virtual Card">
                            <div className="virtual-card">
                                <div className="card-logo">
                                <IoIosWifi size={30} style={{fill: '#fff'}} className="mb-1 me-2 "/>
                                    <img src={Logo} alt="" />
                                </div>
                                <div className="card-num">
                                    <p>2323-3434-2321-1212</p>
                                </div>
                                <div className="card-details">
                                    <div>
                                        <p>Card holder</p>
                                        <p>John Doe Lemi</p>
                                    </div>
                                    <div className="ms-5">
                                        <p>Balance</p>
                                        <p>#5,000,000</p>
                                    </div>
                                </div>
                            </div>
                        </DashboardContentLayout>
                    </div>
                    <DashboardContentLayout title="Transactions">

                    </DashboardContentLayout>
                </div>
            </div>
        </div>
    </div>
    </>
     );
}

export default Virtualcard;