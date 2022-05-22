import React from "react";
import '../styles/transactions.css';
import { BsArrowBarUp } from "react-icons/bs";
import DashboardContentLayout from "./dashboardContentLayout";

function Transactions() {
    return ( 
        <div className="content shadow">
			<nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All Transactions</button>
                    {/* <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> */}
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active mt-5" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="table-header table-responsive-sm mt-3">
                        <table className="table">
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">TYPE</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">AMOUNT</th>
                                    <th scope="col">ASSET</th>
                                    <th scope="col">ADDRESS</th>
                                    <th scope="col">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><BsArrowBarUp size={20} style={{fill: '#006CEB'}} className="me-2 "/>Transfer</td>
                                    <td>Tue May 03 2022 </td>
                                    <td>$4,905.00</td>
                                    <td>USDT</td>
                                    <td>0xd7829300...839783901</td>
                                    <td className="success">Successful</td>
                                </tr>
                                <tr>
                                    <td><BsArrowBarUp size={20} style={{fill: '#006CEB'}} className="me-2 "/>Transfer</td>
                                    <td>Tue May 03 2022 </td>
                                    <td>$4,905.00</td>
                                    <td>USDT</td>
                                    <td>0xd7829300...839783901</td>
                                    <td className="success">Successful</td>
                                </tr>
                                <tr>
                                    <td><BsArrowBarUp size={20} style={{fill: '#006CEB'}} className="me-2 "/>Transfer</td>
                                    <td>Tue May 03 2022 </td>
                                    <td>$4,905.00</td>
                                    <td>USDT</td>
                                    <td>0xd7829300...839783901</td>
                                    <td className="success">Successful</td>
                                </tr>
                                <tr>
                                    <td><BsArrowBarUp size={20} style={{fill: '#006CEB'}} className="me-2 "/>Transfer</td>
                                    <td>Tue May 03 2022 </td>
                                    <td>$4,905.00</td>
                                    <td>USDT</td>
                                    <td>0xd7829300...839783901</td>
                                    <td className="success">Successful</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
            </div>
        </div>
    );
}

export default Transactions;