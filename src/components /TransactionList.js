import React, { useEffect, useState } from "react";
import '../styles/transactions.css';
import firebase from '../firebase/firebase'
import EmptyTransaction from "./emptyTransaction";
import Spinner from 'react-spinkit';

function TransactionList({totalTransaction}) {
    const [transactions, setTransactions] = useState(null);
    const [receiveTotal, setReceiveTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    // const userId = sessionStorage.getItem("userId");
    // const [userId, setUserId] = useState(null)


    useEffect(() => {
        // setUserId(sessionStorage.getItem("userId"))
        const getUserTransactions = async () => {
            const userId = firebase.auth().currentUser.uid
                if (userId) {
                    setLoading(true)
                    const temp = []
                    await firebase.firestore()
                        .collection('transactions')
                        .where("userId", "==", userId)
                        .get()
                        .then((querySnapshot) => {
                            if (querySnapshot.empty) {
                                setLoading(false)
                            }
                            querySnapshot.forEach((doc) => {
                                const data = {
                                    data: doc.data()
                                }
                                temp.push(data)
                                setTransactions(temp)
                                totalTransaction(temp.length)
                                setLoading(false)
                            })
                        }).catch((err) => {
                            console.log(err.message)
                    })
                } 
            }
            getUserTransactions()

        return () => getUserTransactions()
    }, [transactions])
    return ( 
        <>
        {transactions === null ? 
            <EmptyTransaction /> 
        :
        <div className="table-header table-responsive-sm mt-3">
            <table className="table">
                <thead className="table-secondary">
                    <tr>
                        <th scope="col">TYPE</th>
                        <th scope="col">ID</th>
                        <th scope="col">SENT</th>
                        <th scope="col">RECEIVED</th>
                        <th scope="col">TOKEN</th>
                        <th scope="col">DATE</th>
                        <th scope="col">RECEPIENT</th>
                        <th scope="col">STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item,index) => (
                        <tr key={index}>
                            <th>Transfer</th>
                            <td>{`${item.data.id.substring(0, 8)}...`}</td>
                            <td>{item.data.send}</td>
                            <td>{item.data.receive}</td>
                            <td>{item.data.token}</td>
                            <td>{new Date(item.data.date.toDate()).toDateString()}</td>
                            <td>{item.data.account_name}</td>
                            <td className={item.data.status === 'Successful' ? "success" : "pending"}>{item.data.status}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div> }
        </>
     );
}

export default TransactionList;