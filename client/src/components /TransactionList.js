import React, { useEffect, useState } from "react";
import '../styles/transactions.css';
import firebase from '../firebase/firebase'
import EmptyTransaction from "./emptyTransaction";
import Spinner from 'react-spinkit';
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

function TransactionList({totalTransaction}) {
    const [transactions, setTransactions] = useState([]);
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
        {loading === true ?
            <>
                <Skeleton 
                height={60} 
                style={{marginLeft: 24, marginBottom: 20, marginTop: 20, width: '95%'}}
                />
                <Skeleton 
                height={30} 
                count={4} 
                style={{marginLeft: 24, marginBottom: 20, width: '95%'}}/>
            </>
        : transactions.length === 0 ? <EmptyTransaction /> :
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
                            {/* <td className={item.status === 'Successful' ? "success" : "pending"}>{item.status}</td> */}
                            <td className="success">Successful</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div> }
        </>
     );
}

export default TransactionList;