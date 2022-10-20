import React, { useEffect, useState } from "react";
import '../styles/transactions.css';
import firebase from '../firebase/firebase'
import EmptyTransaction from "./emptyTransaction";
import Spinner from 'react-spinkit';
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import { getUserTransaction } from "../api/api";
import NumberFormat from 'react-number-format';
import { Pagination } from "./pagination";
import Pagination2 from "./pagination2";

function TransactionList({totalTransaction}) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    // const userId = sessionStorage.getItem("userId");
    // const [userId, setUserId] = useState(null)
    // {`${item.id.substring(0, 8)}...`}

    const [currentPage, setCurrentPage] = useState(null);
    const [currentCountries, setCurrentCountries] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    
    const [postsPerPage, setPostsPerPage] = useState(10);


    // const getUserTransaction = async () => {
    //     const temp = []
    //     await firebase.firestore().collection('users')
    //         .doc(firebase.auth().currentUser.uid)
    //         .collection('transactions')
    //         .orderBy("date", "desc") 
    //         .onSnapshot((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 temp.push({data:doc.data(), id:doc.id})
    //             })
    //         })
    //     return temp
    // }

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
            setLoading(true)
            getUserTransaction().then((res) => {
                setTransactions(res)
                totalTransaction(transactions.length)
                setLoading(false)
            }).catch((err) => console.log(err.message))
        return () => getUserTransaction()
    }, [])

    // console.log(transactions.length)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const onPageChanged = (data) => {
        const { currentPage, totalPages, pageLimit } = data;
        setCurrentPage(currentPage)
        setTotalPages(totalPages)
        setPostsPerPage(pageLimit)
    }

    // console.log(currentPosts)

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
                        <th scope="col">S/N</th>
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
                    {currentPosts.map((item,index) => (
                        <tr key={index}>
                            <th>{`${(postsPerPage * (currentPage-1)) + index + 1}`}</th>
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
            <div className="d-flex justify-content-between me-2">
                <p className="mt-3">{`Page ${currentPage} of ${Math.ceil(transactions.length / postsPerPage)}`}</p>
                {/* <Pagination postsPerPage={postsPerPage} totalPosts={transactions.length} paginate={paginate}/> */}
                <Pagination2 totalRecords={transactions.length} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} />
            </div>
        </div> 
        
        }
        </>
     );
}

export default TransactionList;