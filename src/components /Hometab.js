import React, { useState } from "react";
import '../styles/Hometab.css'
import TransferMoney from "./transferMoney";
import '../styles/homepage.css';
import SellCrypto from "./sellCrypto";

function HomeTab({className}) {
    const [state, setState] = useState('transfer')
    return ( 
        <div className={className}>
            <div className="form-container">
                <div className="home-tab">
                    <div className="tabs-container">
                        <div className="tabs">
                            <input type="radio" id="radio-1" name="tabs" defaultChecked onClick={() => setState('transfer')}/>
                            <label className="tab" htmlFor="radio-1">Transfer Funds</label>
                            <input type="radio" id="radio-2" name="tabs" onClick={() => setState('crypto')}/>
                            <label className="tab" htmlFor="radio-2">Sell Crypto</label>
                            <span className="glider"></span>
                        </div>
                    </div>
                </div>
                {state === 'transfer' ? 
                <TransferMoney /> : <SellCrypto /> }
            </div>
        </div>
     );
}

export default HomeTab;