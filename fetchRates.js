const axios = require("axios"); 
require('dotenv').config

function percentRange(min, max) {
     return Math.random() * (max - min) + min;
}

const getRate = async (asset, fiat) => 
     await axios({
          url: 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
          method: 'post',
          data: JSON.stringify({
          page:1,
          rows: 20,
          publisherType: null,
          asset: asset,
          tradeType:"SELL",
          fiat: fiat,
          payTypes:[],
          }),
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          },
     }).then((response) => {
     let rates =  response.data.data
     let price = rates.map((item) => {
          let allRates = []
          allRates.push(parseFloat(item.adv.price))
          // allRates[item.adv.asset] = parseFloat(item.adv.price)
          return allRates
     });
     const getMid = (arr) => {
          const mid = Math.floor(arr.length / 2),
          nums = arr.map(parseFloat).sort((a, b) => a - b);
          return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
     }
     const midPrice = getMid(price)

     const percentOff = (percent, rate) => {
          const off  = percent / 100 * rate 
          return rate - off
     }

     const percentValue = percentRange(1.2, 1.5)

     const final_rate = percentOff(percentValue, midPrice)

     const data = {}
     data[asset] = final_rate
     return data
     
     }).catch((err) => console.log(err.message))  


module.exports = fetchRates = async() => {
     const btc = await getRate("BTC", "NGN");
     const usdt = await getRate("USDT", "NGN");
     const eth = await getRate("ETH", "NGN");
     const busd = await getRate("BUSD", "NGN");

     const allRates = [btc, usdt, eth, busd]
     return allRates
}

fetchRates()
