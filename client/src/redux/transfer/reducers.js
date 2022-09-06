import * as types from './actions/actionTypes';

const initialState = {
    error: "",
    loading: true,
    transfer:{
        sendAmount: "",
        receiveAmount: "",
        token: ""
    },
    recepient: {
        accountName: "",
        accountNumber: "",
        bankName: "",
        bankCode: "1",
        email: "",
        phoneNumber: "",
        purpose: ""
    },
    rates: {
        BUSD: "",
        USDT: "",
        TRX: ""
    },
    active: false,
    payment: false
}

export default function transferReducer (state = initialState, action) {
    switch (action.type) {
        case types.TRANSFER_DETAILS:
            return{...state, transfer: action.payload, active:true};
        case types.RECEPIENT_DETAILS:
            return{...state, recepient: action.payload, active:true};
        case types.PAYMENT:
            return{...state, payment:!state.payment};
        case types.CONVERSION_RATES:
            return{...state, rates: action.payload, loading: false};
        default:
            return state;
    }
}