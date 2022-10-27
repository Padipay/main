const axios = require("axios"); 
const crypto = require('crypto');

require('dotenv').config

const apiKey = process.env.BINANCE_API_KEY
const apiSecret = process.env.BINANCE_SECRET_KEY
const baseURL = process.env.BINANCE_BASE_URL
const public_key = process.env.BINANCE_PUBLIC_KEY

function hash_signature(query_string) {
    return crypto
        .createHmac('sha512', apiSecret)
        .update(query_string)
        .digest('hex');
  }

function random_string() {
    return crypto.randomBytes(32).toString('hex').substring(0,32);
}

module.exports  = function dispatch_request(http_method, path, payload = {}) {
    const timestamp = Date.now()
    const nonce = random_string()
    const payload_to_sign = timestamp + "\n" + nonce + "\n" + JSON.stringify(payload) + "\n"
    const url = baseURL + path
    const signature = hash_signature(payload_to_sign)

    return axios.create({
        baseURL, 
        headers: {
            'content-type': 'application/json',
            'BinancePay-Timestamp': timestamp,
            'BinancePay-Nonce': nonce,
            'BinancePay-Certificate-SN': apiKey,
            'BinancePay-Signature': signature.toUpperCase()
        }
    }).request({
        'method': http_method,
        url,
        data: payload
    })
}


// Creating Hash
// const hash = crypto.createHash('sha256', 'Geeksforgeeks');