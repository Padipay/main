import React, { useEffect, useState } from "react";
import '../styles/transactions.css';
import firebase from '../firebase/firebase'
import EmptyTransaction from "./emptyTransaction";
import Spinner from 'react-spinkit';

function TransactionList({totalTransaction}) {
    const [transactions, setTransactions] = useState([]);
    const [receiveTotal, setReceiveTotal] = useState(null);
    const [loading, setLoading] = useState(true);
    // const userId = sessionStorage.getItem("userId");
    // const [userId, setUserId] = useState(null)
    // {`${item.id.substring(0, 8)}...`}


    useEffect(() => {
        const getUserTransactions = async () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    const temp = []
                    firebase.firestore().collection('transactions')
                        .where("userId", "==", user.uid)
                        .onSnapshot((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (doc.exists) {
                                    temp.push(doc.data())
                                }
                            });
                            setTransactions(temp)
                            totalTransaction(temp.length)
                            setLoading(false)
                        })   
                }
            })
            }
            getUserTransactions()
        return () => getUserTransactions()
    }, [])
    return ( 
        <>
        {transactions.length === 0 ? <EmptyTransaction/> : !loading &&
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
                            <td>{item.id}</td>
                            <td>{item.send}</td>
                            <td>{item.receive}</td>
                            <td>{item.token}</td>
                            <td>{new Date(item.date.toDate()).toDateString()}</td>
                            <td>{item.account_name}</td>
                            <td className={item.status === 'Successful' ? "success" : "pending"}>{item.status}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div> }
        </>
     );
}

export default TransactionList;