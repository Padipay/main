import React from "react";
import '../../styles/homepage.css';
import playbutton from '../../images/Play.png';
import wallet from '../../images/wallet-icon.png';
import bankDetails from '../../images/bank-details.png';
import sendCrypto from '../../images/send-crypto.png';
import easier from '../../images/easier.png';
import faster from '../../images/faster.png';
import cheaper from '../../images/cheaper.png';
import Questions from "./questions";
import Footer from '../Layouts/footer'
import SendFormTab from "../transaction/SendFormTab";
import Navbar from "../Layouts/navbar";
import logo from '../../images/Logo3.png';

function Homepage() {
    return ( 
        <div className="home-page">
            <div className="container-fluid homepage-container">
                <div className="row">
                </div>
                <Navbar image={logo}/>
                <div className="row mt-5 header-content">
                    <div className="col-lg-4 col-sm-3 header-info mb-4 mt-5">
                        <h1>Instant money transfer in three easy steps</h1>
                        <p>Send and receive money with friends and family, exchange your Crypto for local currency..</p>
                        <div className="demo">
                            <img src={playbutton} alt="" />
                            <p>See how it works</p>
                        </div>
                    </div>
                    <SendFormTab className="col-lg-4 col-sm-6 mb-5 mt-3"/>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <h1 className="header-details">How Padipay works </h1>
                    <p className="sub-info">In three easy steps you instantly send money to anyone.</p>
                </div>
                <div className="row row-step">
                    <div className="col-4 first-step mb-4">
                        <img src={wallet} alt="" />
                        <h6>Enter Amount</h6>
                        <p>Enter the amount in the local currency of the person you’re sending money to.</p>
                    </div>
                    <div className="col-4 first-step mb-4" style={{background: '#FFF6E4'}}>
                        <img src={bankDetails} alt="" />
                        <h6>Enter recipient details</h6>
                        <p>Enter the bank account details of the person you’re sending money to. </p>
                    </div>
                    <div className="col-4 first-step mb-4" style={{background: '#F8E2FF'}}>
                        <img src={sendCrypto} alt="" />
                        <h6>Send Crypto</h6>
                        <p>Send Crypto from any wallet to the unique Crypto address generated for your transaction.</p>
                    </div>
                </div>
            </div>
            <div className="container reason-container">
                <div className="row reason">
                    <h1>Why you should use Padipay</h1>
                    <p className="sub-info">Still not convinced yet on why to use padipay?</p>
                </div>
                <div className="row row-step">
                    <div className="col-4 first-step mb-4 shadow mb-5 bg-body">
                        <img src={easier} alt="" />
                        <h6>Easier</h6>
                        <p>We make sending money simple with easy to understand steps. Cutting out all complexities.</p>
                    </div>
                    <div className="col-4 first-step mb-4 shadow mb-5 bg-body">
                        <img src={faster} alt="" />
                        <h6>Faster</h6>
                        <p>Sending money with Padipay takes under 5 minutes - much faster than other services</p>
                    </div>
                    <div className="col-4 first-step mb-4 shadow mb-5 bg-body">
                        <img src={cheaper} alt="" />
                        <h6>Cheaper</h6>
                        <p>We offer the best exchange rate so you get better value for your money when you send money</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5 questions-container">
                <div className="row row-questions">
                    <h1>Frequently asked questions</h1>
                    <Questions />
                </div>
            </div>
            <Footer />
        </div>
     );
}

export default Homepage;