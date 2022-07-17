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