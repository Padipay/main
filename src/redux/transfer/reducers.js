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
    token_rates: {},
    active: false,
    payment: false, 
    end_time: null
}

export default function transferReducer (state = initialState, action) {
    switch (action.type) {
        case types.TRANSFER_DETAILS:
            return{...state, transfer: action.payload, active:true};
        case types.RECEPIENT_DETAILS:
            return{...state, recepient: action.payload, active:true};
        case types.PAYMENT:
            return{...state, payment:!state.payment};
        case types.TOGGLE_LOADING:
            return{...state, loading:!state.loading}
        case types.RATES:
            return{...state, token_rates:action.payload, loading: false}
        case types.END_TIMER:
            return{...state, end_time:action.payload}
        case types.ERROR_FETCHING:
            return{...state, error:action.payload}
        default:
            return state;
    }
}