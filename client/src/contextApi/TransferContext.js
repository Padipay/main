import React, { createContext, useState } from "react";

export const TransferContext = createContext();

function TransferContextProvider({children}) {
    const[ sendAmount, setSendAmount ] = useState('');
    const [receiveAmount, setReceiveAmount ] = useState('');
    const [tokenValue, setTokenValue ] = useState('BTC');
    const [recepientName, setRecepientName ] = useState('');
    const [recepientAccNum, setRecepientAccNum ] = useState('')

    const value = {sendAmount, setSendAmount, 
        receiveAmount, setReceiveAmount, 
        tokenValue, setTokenValue,
        recepientName, setRecepientName,
        recepientAccNum, setRecepientAccNum
    };

    return (
        <TransferContext.Provider value={value}>
            {children}
        </TransferContext.Provider>
      );
}

export default TransferContextProvider;