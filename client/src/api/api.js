import firebase from '../firebase/firebase';

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

export const userTransaction = async () => {
    const temp = []
    await firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('transactions')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push(doc.data())
            })
        }).catch((err) => {
            console.log(err.message)
        }) 
        console.log(temp)
    return temp
}

export const saveTransaction = (userId=null, receive, send, token, bankName, account_name, account_number) => {
    const transaction = firebase.firestore().collection('transactions').doc()
        transaction
            .set({
                userId: userId,
                transaction_id: transaction.id,
                receive,
                send,
                token,
                bankName,
                account_name,
                account_number,
                status: false,
                date: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log('Transaction Saved')
                sessionStorage.setItem("transactionId", transaction.id) 
                if (firebase.auth().currentUser) {
                    firebase.firestore()
                            .collection('users')
                            .doc(firebase.auth().currentUser.uid)
                            .collection('transactions').doc(transaction.id)
                            .set({
                                userId: userId,
                                id: transaction.id,
                                receive,
                                send,
                                token,
                                bankName,
                                account_name,
                                account_number,
                                date: firebase.firestore.FieldValue.serverTimestamp()
                            }).then(() => {
                                console.log("Document successfully written!");
                            }).catch((err) => {
                                console.log(err.message)
                            })
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
}

export const signOut = () => {
    firebase
    .auth()
    .signOut().then(() => {
        sessionStorage.clear()
    }).catch((err) => {
        console.log(err.message)
    })
}

// export const getBusdPrice = async () => {
//    await fetch(`https://api.coinbase.com/v2/prices/BTC-NGN/spot`)
//    .then((res) => res.json())
//    .then((data) => {
//        return data
//    }).catch((err) => {
//     console.log(err.message)
// }) 
// }