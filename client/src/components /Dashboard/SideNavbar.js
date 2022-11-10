import React, {  } from "react";
import '../../styles/authentication/dashboard.css';
import DashboardMenu from './dashboardMenu'
import { MdDashboard } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdArticle } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { BsCreditCard } from "react-icons/bs";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { signOut } from "../../redux/auth/actions/actions";
import { useDispatch } from "react-redux";

function SideNavbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const values = [
        {id: 0, name: "Dashboard", to:"/dashboard", icon: <MdDashboard  size={25} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>}, 
        {id: 1, name:"Transactions", to: "/transactions", icon:<MdArticle size={25} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>}, 
        {id: 2, name:"Wallet", to: "/wallet", icon:<GiWallet size={25} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>}, 
        {id: 3, name:"Virtual Card", to: "/card", icon:<BsCreditCard size={25} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>}, 
        {id: 4, name: "Settings", to: "/settings", icon:<MdSettings size={25} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>}, 
    ]


    const logOut = () => {
        dispatch(signOut(navigate))
    }

    return (  
        <>
            <DashboardMenu values={values} logout={logOut}/>
            <div className="col-lg-2 col-sm-12 col-md-12 sidebar">
                <ul className="nav nav-pills nav-fill flex-column mt-3">
                    {values.map((val, index) => (
                        <li className="nav-item" key={index}>
                            <NavLink to={val.to} className="nav-link" activeclassname="nav-link active" aria-current="page">
                             {val.icon}
                            {val.name}</NavLink>
                        </li>
                    ))}
                    <li className="nav-item" key="item4">
                        <Link to="" className="nav-link" onClick={logOut} >
                        <BiLogInCircle  size={30} style={{fill: '#7D8392'}} className="mb-1 me-2 "/>
                            Sign out</Link>
                    </li> 
                </ul>
            </div> 
        </> 
    );
}

export default SideNavbar;