import firebase from '../firebase/firebase';

export const bankVerify = async (accountNumber, bankCode) => {
    try {
        const options = {method: 'GET', headers: {Accept: 'application/json', 'Authorization': `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`}};
        const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, options)
        return await response.json()
    } catch (error) {
        console.log("Could not verify account details. Check details and try again.")
    }
}

export const getRates = async () => {
    try {
        const options = {method: 'GET'};
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/padipay/rates`)
        return response.json()
    } catch (err) {
        throw Error(err.message)
    }
}

export const getCryptoPayment = async () => {
    try {
        // const options = {method: 'GET'}
        const response = await fetch(`https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${process.env.REACT_APP_WALLET_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.REACT_APP_BSC_SCAN_API_KEY}`)
        return response.json()
    } catch (error) {
        console.log("Couldn't fetch payment details")
    }
}

export const getCryptoPaymentBEP20 = async (contractAdd) => {
    try {
        // const options = {method: 'GET'}
        const response = await fetch(`https://api-testnet.bscscan.com/api?module=account&action=tokentx&contractaddress=${contractAdd}&address=${process.env.REACT_APP_WALLET_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.REACT_APP_BSC_SCAN_API_KEY}`)
        return response.json()
    } catch (error) {
        console.log("Couldn't fetch payment details")
    }
}

// const getPayment = async () => {
//     await fetch("https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x78565af8DEfD0217EAd6723999D31aeaA763b848&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=PGJ8XEAQADRZGVNX8EMBY6S1Y5BH3ZSGRX")
//     .then((res) => {
//         if (!res.ok) {
//             throw Error('Could not send message')
//         }
//         return res.json()

//     }).then((data) => console.log(data.result))
//     .catch((e) => console.log(e.message))
// }


export const payout = async(email, accName, accNum, amount, id) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'api-key': process.env.REACT_APP_FINCRA_SECRET_KEY
            },
            body: JSON.stringify({
              sourceCurrency: 'NGN',
              destinationCurrency: 'NGN',
              beneficiary: {
                firstName: accName,
                email: email,
                type: 'individual',
                accountHolderName: accName,
                accountNumber: accNum
              },
              paymentDestination: 'bank_account',
              amount: amount,
              customerReference: id,
              business: process.env.REACT_APP_FINCRA_BUSINESS_ID,
              description: 'Transfer'
            })
          };
          const response = await fetch('https://sandboxapi.fincra.com/disbursements/payouts', options)
          return await response.json()
    } catch (error) {
        console.log("Payout unsuccessful")
    }
    
}