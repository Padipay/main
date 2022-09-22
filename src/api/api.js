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

export const getRates = async () => 
    await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/padipay/rates`, {
        method: 'GET',
    }).then((res) => {
        if (!res.ok) {
            throw Error('Could not load the data for the resource ')
        }
        return res.json()
    }).then((data) => {
        return data
    }).catch((err) => console.log(err.message))
