
import { useDispatch } from "react-redux"
import { conversionRates } from "../redux/transfer/actions/actions"


export const fetchRates = async (url) => {
    await fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => {
        const price = data.data.amount
        return price
    }).catch((err) => {
        console.log(err.message)
    }) 
}
