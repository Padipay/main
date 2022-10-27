import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/transactions/transactions.css';
import TransactionList from "../transaction/TransactionList";
import SideNavbar from "./SideNavbar";
import DashboardInfo from "./DashboardInfo";
import { getUser } from "../../redux/auth/actions/actions";

function Transactions() {
    const {transactions} = useSelector(state => state.auth_details)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    },[])

    return ( 
        <div className="home-page">
            <div className="container-fluid dashboard-container">
                <div className="row">
                    <SideNavbar />
                    <div className="col-lg-9 col-sm-12 col-md-12 ms-lg-5">
                        <DashboardInfo />
                        <div className="dashboard-container">
                        <div className="content shadow">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All Transactions</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active mt-5" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <TransactionList totalTransaction={transactions}/>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transactions;