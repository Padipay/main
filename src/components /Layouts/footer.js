import React from "react";
import '../../styles/footer.css';
import logo from '../../images/Logo.png'
function Footer() {
    return (
        <>
            <div className="row footer-row">
                <div className="col-lg-4 col-sm-9 mt-5 footer-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="col-lg-4 col-sm-9 mt-5 email">
                    <p>hello@padipay.com</p>
                </div>
                <div className="col-lg-4 col-sm-6 mt-5 socials">
                    <span>Instagram</span>
                    <span>Twitter</span>
                    <span>LinkedIn</span>
                </div>
            </div>
        </>
     );
}

export default Footer;