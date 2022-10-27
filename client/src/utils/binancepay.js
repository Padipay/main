import uniqid from 'uniqid';

export const paymentOrder = async (amount, curr) => {
    try {
       const options = {
            method: 'POST',
            body: JSON.stringify({
                http_method: "POST",
                path: '/binancepay/openapi/v2/order',
                payload: {
                    env : {
                        terminalType: "WEB"
                    },
                    merchantTradeNo: "PP" + Math.floor(Math.random() * 5000000000),
                    orderAmount: amount,
                    currency: curr,
                    goods : {
                        goodsType: "02",
                        goodsCategory: "Z000",
                        referenceGoodsId: uniqid(),
                        goodsName: "Padipay Transfer",
                        goodsDetail: `${curr} transfer to padipay`
                    }
                }
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }
       const response =  await fetch('http://localhost:5000/create-order', options)
       return await response.json()
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

