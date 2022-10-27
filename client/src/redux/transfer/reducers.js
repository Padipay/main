import * as types from './actions/actionTypes';

const initialState = {
    error: "",
    loading: true,
    transfer:{},
    edit_transfer: false,
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
    payment_status: false,
    payment_timestamp: {
        timestamp: "",
        expriryTimestamp: ""
    }, 
    end_time: null,
    payment_data: {}
}

export default function transferReducer (state = initialState, action) {
    switch (action.type) {
        case types.TRANSFER_DETAILS:
            return{...state, transfer: action.payload, active:true};
        case types.EDIT_TRANSFER:
            return{...state, edit_transfer:!state.edit_transfer}
        case types.RECEPIENT_DETAILS:
            return{...state, recepient: action.payload, active:true};
        case types.PAYMENT_STATUS:
            return{...state, payment_status:!state.payment_status};
        case types.PAYMENT_TIMESTAMP:
            return{...state, payment_timestamp:action.payload};
        case types.TOGGLE_LOADING:
            return{...state, loading:!state.loading}
        case types.RATES:
            return{...state, token_rates:action.payload, loading: false}
        case types.BINANCE_PAY:
            return{...state, payment_data:action.payload}
        case types.END_TIMER:
            return{...state, end_time:action.payload}
        case types.ERROR_FETCHING:
            return{...state, error:action.payload}
        default:
            return state;
    }
}