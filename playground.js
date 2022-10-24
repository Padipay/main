{/* <div className="send-form">
                <div className="input-border">
                    <label className="label-send">You send</label>
                    <input type="text" className="input-amount" /> 
                    <select name="token" id="tokens" className="select-token">
                        <option value="btc">BTC</option>
                        <option value="usdt">USDT</option>
                        <option value="eth">ETH</option>
                    </select>
                </div>
                <div className="input-border">
                    <label className="label-send">Recipient gets</label>
                    <input type="text" className="input-amount" />
                    <select name="token" id="fiat" className="select-token">
                        <option value="btc">NGN</option>
                    </select>
                </div>
                <div className="conversion">
                    <p>1 BTC = 23,126,592.56 NGN</p>
                </div>
                <div className="seperator"></div>
                <div className="input-border">
                    <label className="label-send">Destination</label>
                    <select name="destination" id="" className="select-destination">
                        <option value="btc">NGN</option>
                    </select>
                </div>
                <div className="homepage-send-btn">
                    <button type="button" className="btn btn-primary btn-lg">Continue</button>
                </div>
            </div> */}


                    // <input 
                    //     type="text" 
                    //     placeholder="0.0001"
                    //     onInput={(value) => String(value).replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                    //     {...register("send")}
                    //     className="input-amount" 
                    //     value={send}
                    //     onChange={handleSend}
                    // />

                    // <input 
                    //     type="text" 
                    //     placeholder="500"
                    //     pattern="[1-9]\d*"
                    //     {...register("receive")}
                    //     className="input-amount" 
                    //     value={receive}
                    //     onChange={handleReceive}
                    // />

                    //     .get()
                    //     .then((querySnapshot) => {
                    //         if (querySnapshot.empty) {
                    //             setLoading(false)
                    //         }
                    //         querySnapshot.forEach((doc) => {
                    //             const data = {
                    //                 data: doc.data()
                    //             }
                    //             temp.push(data)
                    //             setTransactions(temp)
                    //             totalTransaction(temp.length)
                    //             setLoading(false)
                    //         })
                    //     }).catch((err) => {
                    //         console.log(err.message)
                    // })

// const convRates = async () => {
    //     const temp = []
    //     await firebase.firestore().collection("rates")
    //         .onSnapshot((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 if (doc.exists) {
    //                     temp.push({
    //                         token: doc.data().Token,
    //                         rate:  doc.data().currentRate
    //                     });
    //                 }
    //                 setRates(temp)
    //                 setLoading(false)
    //             });
    //         })
    //     }

    // const getBusdPrice = async () => {
    //     await fetch(`https://api.coinbase.com/v2/prices/BUSD-NGN/spot`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const price = data.data.amount
    //         setBusdPrice(price)
            
    //     }).catch((err) => {
    //         console.log(err.message)
    //     }) 
    // }

    // const getUSDTPrice = async () => {
    //     await fetch(`https://api.coinbase.com/v2/prices/USDT-NGN/spot`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const price = data.data.amount
    //         setUsdtPrice(price)
    //     }).catch((err) => {
    //         console.log(err.message)
    //     }) 
    // }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getUSDTPrice()
    //         getBusdPrice()
    //     }, 7000);
    //     convRates()

    //     return () => clearInterval(interval)
    // }, [])

    // <div className="row main-content">
    //             <div className="col-lg-3 col-sm-2 d-none d-sm-block d-md-block">
    //                 <Stepper page_num={page}/>
    //             </div>
    //                 <FormContainerLayout title="How much are you sending?">
    //                     <SendAmountContainer>
    //                         <div className="home-tab">
    //                             <div className="tabs-container">
    //                                 <div className="tabs">
    //                                     <input type="radio" id="radio-1" name="tabs" defaultChecked onClick={() => setState('transfer')}/>
    //                                     <label className="tab" htmlFor="radio-1">Transfer Money</label>
    //                                     {/* <input type="radio" id="radio-2" name="tabs" onClick={() => setState('crypto')}/> */}
    //                                     {/* <label className="tab" htmlFor="radio-2">Sell Crypto</label> */}
    //                                     <span className="glider"></span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         {state === 'transfer' ?<TransferMoney /> : <SellCrypto /> }
    //                     </SendAmountContainer>
    //                 </FormContainerLayout>

    // const getBusdPrice = async () => {
    //     await fetch(`https://api.coinbase.com/v2/prices/BUSD-NGN/spot`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const price = data.data.amount
    //         setBusdPrice(price)
    //         setLoading(false)
            
    //     }).catch((err) => {
    //         console.log(err.message)
    //     }) 
    // }

    // const getUSDTPrice = async () => {
    //     await fetch(`https://api.coinbase.com/v2/prices/USDT-NGN/spot`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const price = data.data.amount
    //         setUsdtPrice(price)
    //     }).catch((err) => {
    //         console.log(err.message)
    //     }) 
    // }


//     <div className="input-border d-none">
//     <label className="label-send">Recipient gets</label>
//     <Controller 
//         name="receive"
//         control={control}
//         render={({field, field: { onChange, value } }) => (
//             <NumberFormat
//             thousandSeparator={true}
//             className="input-amount"
//             inputMode="numeric"
//             placeholder="500"
//             decimalScale={3}
//             onValueChange={(values) => {
//                 const { value } = values;
//                 onChange(value)
//                 handleReceive(value)
//             }}
//             value={value}
//             {...field}
//             />
//         )}
//     />
//     <StyledSelectTwo
//     {...register("fiat")}
//     defaultValue="NGN"
//     name="token" id="fiat" 
//     onChange={handleCountry}>
//         <option value="ngn">NGN</option>
//     </StyledSelectTwo>
//     {country === 'NGN' && <img src={nig} alt="btc" className="select-token-image"/>}
// </div>

// await axios({
//     url: 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
//     method: 'post',
//     data: JSON.stringify({
//         page:1,
//         rows: 20,
//         publisherType: null,
//         asset: asset,
//         tradeType:"SELL",
//         fiat: fiat,
//         payTypes:[],
//     }),
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json; charset=UTF-8',
//       },
// }).then((response) => {
//    let rates =  response.data.data
//    let price = rates.map((item) => {
//         let allRates = []
//         allRates.push(parseFloat(item.adv.price))
//         // allRates[item.adv.asset] = parseFloat(item.adv.price)
//         return allRates
//    });
//    const getMid = (arr) => {
//         const mid = Math.floor(arr.length / 2),
//         nums = arr.map(parseFloat).sort((a, b) => a - b);
//         return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
//    }
//    const midPrice = getMid(price)

// //    const maxPrice = price[0].toLocaleString()
// //    const minPrice = price[price.length -1].toLocaleString()

//    const percentOff = (percent, rate) => {
//         const off  = percent / 100 * rate 
//         return rate - off
//    }

//    const final_rate_one = percentOff(1.8, midPrice)
//    const final_rate_two = percentOff(1.5, midPrice)
//    const final_rate_three = percentOff(1.3, midPrice)

//    console.log(final_rate_three, final_rate_two, final_rate_one)



  // const urls = [
  //   `https://api.coinbase.com/v2/prices/BUSD-NGN/spot`,
  //   `https://api.coinbase.com/v2/prices/USDT-NGN/spot`
  // ];

  // const fetchRates = () => {
  //     Promise.all(
  //         urls.map(url => 
  //           fetch(url)
  //               .then(res => res.json())
  //               .then(res => res.data.amount)
  //           )
  //       ).then(amount => {
  //           const rates = {busd: amount[0], usdt: amount[1], trx: amount[1]}
  //           dispatch(conversionRates(rates))
  //         });
  // };\

//   if (!(payment.timestamp < data[0].timestamp) && !(payment.timestamp > data[0].timestamp)) 
//   console.log(payment.active)
//   console.log(payment.active)
    // useEffect(() => {
    //     const getStatus = setInterval( async () => {
    //         const transactionid = sessionStorage.getItem("transactionId")
    //         const temp = []
    //         if (transactionid) {
    //             await firebase
    //                 .firestore().collection('transactions')
    //                 .doc(transactionid)
    //                 .onSnapshot((doc) => {
    //                     temp.push(doc.data())
    //                     setTransactions(temp)
    //                     if (transactions && transactions[0].status === true) {
    //                         const date = new Date(transactions[0].date.toDate()).toDateString()
    //                         const body = `Your transaction with ID number: ${transactionid} on padipay was successful.`
    //                         const phone_number = `+${phoneNumber}`
    //                         sendSms(phone_number, body)
    //                         transactSuccessEmail(email, sendAmount, receiveAmount, tokenValue, date, transactionid)
    //                         console.log("status has changed")
    //                         setSuccess(true)
    //                         sessionStorage.setItem("success", true)
    //                         navigate('/success-transact')
    //                     }
    //                 })         
    //             }
    //     }, 5000);
    //     return () => clearInterval(getStatus)
    // }, [transactions]) 

    // "100,000,000,000,000,000"
    // "100,000,000,000,000,000"


    // 1665438254239
    // 1665439454239
    // 1665438325
    
// "proxy": "http://localhost:5000",

// export const savePayment = (ref, receiveAmount, sendAmount, tokenValue, bankName, accountName, accountNumber) => {
//     const transaction = firebase.firestore().collection('transactions').doc()
//         transaction
//         .set({
//             receive: receiveAmount,
//             send: sendAmount,
//             token: tokenValue,
//             bankName: bankName,
//             account_name: accountName,
//             account_number: accountNumber,
//             status: "paid",
//             payment_ref: ref,
//             date: firebase.firestore.FieldValue.serverTimestamp()
//         }).then(() => {
//             console.log('Payment saved successfully')
//             return transaction.get();
//         }).then((doc) => {
//             if (!doc.exists) {
//                 console.log("No such document!"); //Error
//               } else {
//                   console.log(doc.data())
//             }
//         })
//         .catch((err) => console.log(err.message))
// }

// eth = '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378'
// usdt = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'

{/* <Controller
                            name="send"
                            control={control}
                            render={({ field: { value, onChange, ...field } }) => (
                                <input 
                                type="number" 
                                className="input-amount" 
                                placeholder="0.001"
                                onChange={(e) =>{
                                    onChange(e.target.value)
                                    handleSend(e)
                                }}/>
                              )}
                              value={sendAmount}
                            />  */}

                            {/* <Controller 
                            name="send"
                            control={control}
                            render={({field, field: { onChange, value } }) => (
                                <NumberFormat
                                thousandSeparator={true}
                                className="input-amount"
                                inputMode="numeric"
                                placeholder="0.001"
                                // decimalScale={5}
                                onValueChange={(values) => {
                                    const {value} = values;
                                    onChange(value)
                                    handleSend(value)
                                }}
                                // value={value}
                                {...field}
                                />
                            )}
                        /> */}
                        {/* <Controller
                            name="receive"
                            control={control}
                            render={({ field: { value, onChange, ...field } }) => (
                                <input 
                                type="text" 
                                className="input-amount" 
                                placeholder="1,000"
                                onChange={(e) =>{
                                    onChange(e.target.value)
                                    handleReceive(e)
                                }}/>
                              )}
                              value={receiveAmount}
                            />  */}
                            {/* <Controller 
                                name="receive"
                                control={control}
                                render={({field, field: { onChange, value } }) => (
                                    <NumberFormat
                                    thousandSeparator={true}
                                    className="input-amount"
                                    inputMode="numeric"
                                    placeholder="500"
                                    decimalScale={1}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        onChange(value)
                                        handleReceive(value)
                                    }}
                                    // value={receiveAmount}
                                    {...field}
                                    />
                                )}
                            /> */}
                            {/* <div className="homepage-seperator"></div> */}
                {/* {type === 'transfer' ? 
                <div className="input-border">
                    <label className="label-send">Destination</label>
                    <select name="destination" id="" className="select-destination" onChange={handleCountry}>
                        <option value="NGN">NGN</option>
                    </select>
                    <img src={nig} alt="ngn" className="select-country-image"/>
                </div> : null } */}
                