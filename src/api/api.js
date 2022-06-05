// export const bankName = async (accountNumber, bankCode) => {
//     const options = {method: 'GET', headers: {Accept: 'application/json', 'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`}};

//     await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, options)
//     .then(response => response.json())
//     .then(response => {
//         if (response.status === true) {
//             setAccountName(response.data.account_name)
//             setVisible(true)
//             setLoading(false)
//         }else{
//            setError("Could not verify account details. Check details and try again.")
//            setLoading(false)
//         }
//     }).catch(err => console.log(err));

// }

