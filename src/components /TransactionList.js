import React, { useEffect, useState } from "react";
import '../styles/transactions.css';
import firebase from '../firebase/firebase'
import EmptyTransaction from "./emptyTransaction";
import Spinner from 'react-spinkit';
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import { getUserTransaction } from "../api/api";
import NumberFormat from 'react-number-format';


function TransactionList({totalTransaction}) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    // const userId = sessionStorage.getItem("userId");
    // const [userId, setUserId] = useState(null)
    // {`${item.id.substring(0, 8)}...`}


    useEffect(() => {
        // const getUserTransactions = async () => {
        //     firebase.auth().onAuthStateChanged((user) => {
        //         if (user) {
        //             const temp = []
        //             firebase.firestore().collection('transactions')
        //                 .where("userId", "==", user.uid)
        //                 .onSnapshot((querySnapshot) => {
        //                     querySnapshot.forEach((doc) => {
        //                         if (doc.exists) {
        //                             temp.push(doc.data())
        //                         }
        //                     });
        //                     setTransactions(temp)
        //                     totalTransaction(temp.length)
        //                     setLoading(false)
        //                 })   
        //         }
        //     })
        //     }
        //     getUserTransactions()
            getUserTransaction().then((res) => {
                setTransactions(res)
                totalTransaction(res.length)
                setLoading(false)
            }).catch((err) => console.log(err.message))
        return () => getUserTransaction()
    }, [])

    // console.log(totalTransaction)
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
        <div className="table-header table-responsive mt-3">
            <table className="table">
                <thead className="table-secondary">
                    <tr>
                        <th scope="col">TYPE</th>
                        <th scope="col">TRANSACTION REF</th>
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
                            <td>
                                <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={`${item.data.send}`}
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true} 
                                decimalScale={2}
                                    />
                            </td>
                            <td>
                                <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={`${item.data.receive}`}
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true} 
                                decimalScale={2}
                                />
                            </td>
                            <td>{item.data.token}</td>
                            <td>{new Date(item.data.date.toDate()).toLocaleString()}</td>
                            <td>{item.data.account_name.length < 40 ? item.data.account_name : `${item.data.account_name.substring(0, 40)}...`}</td>
                            {/* <td className={item.status === 'Successful' ? "success" : "pending"}>{item.status}</td> */}
                            <td className="success">Successful</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <div className="me-5">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                            <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                {/* <span class="sr-only">Previous</span> */}
                            </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                {/* <span class="sr-only">Next</span> */}
                            </a>
                            </li>
                    </ul>
                </nav>
            </div>
        </div> 
        
        }
        </>
     );
}

export default TransactionList;