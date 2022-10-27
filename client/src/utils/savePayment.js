import firebase from '../../src/firebase/firebase'
export const savePayment = (ref, receiveAmount, sendAmount, tokenValue, bankName, accountName, accountNumber) => {
    const transaction = firebase.firestore().collection('transactions').doc()
        transaction
        .set({
            receive: receiveAmount,
            send: sendAmount,
            token: tokenValue,
            bankName: bankName,
            account_name: accountName,
            account_number: accountNumber,
            status: "paid",
            payment_ref: ref,
            date: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log('Payment saved successfully')
            return transaction.get();
        }).catch((err) => console.log(err.message))
}

export const userTransaction = (ref, receiveAmount, sendAmount, tokenValue, bankName, accountName, accountNumber) => {
    firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('transactions').doc()
        .set({
            receive: receiveAmount,
            send: sendAmount,
            token: tokenValue,
            bankName: bankName,
            account_name: accountName,
            account_number: accountNumber,
            status: "paid",
            payment_ref: ref,
            date: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log('Payment saved successfully')
            // return transaction.get();
        }).catch((err) => console.log(err.message))
}
