import * as types from './actionTypes';
import { getRates } from '../../../api/api';

export const transferDetails = (details) => dispatch =>{
    dispatch({
        type: types.TRANSFER_DETAILS,
        payload: details
    });
};

export const recepientDetails = (recepient) => dispatch => {
    dispatch({
        type:types.RECEPIENT_DETAILS,
        payload: recepient
    });
};

export const paymentStatus = () => dispatch => {
    dispatch({
        type: types.PAYMENT_STATUS,
    })
}

export const paymentTimestamp = (data) => dispatch => {
    dispatch({
        type: types.PAYMENT_TIMESTAMP,
        payload:data
    })
}

export const conversionRates = (rate) => dispatch => {
    dispatch({
        type:types.CONVERSION_RATES,
        payload:rate
    });
};

export const api_rates = (rate) => dispatch => {
    dispatch({
        type: types.RATES,
        payload: rate
    });
};

export const toggleLoading = () => dispatch => {
    dispatch({
        type: types.TOGGLE_LOADING
    });
};

export const fetchError = (error) => dispatch => {
    dispatch({
        type: types.ERROR_FETCHING,
        payload: error
    });
};

export const fetch_api_rates = () => dispatch => {
    // dispatch(toggleLoading())
    const rates = getRates()
    rates.then((res) => {
        dispatch(api_rates(res))
    }).catch((err) => dispatch(fetchError(err)))
};

export const endTimer = (timer) => dispatch => {
    dispatch({
        type:types.END_TIMER,
        payload: timer
    })
}

export const binancePay = (data) => dispatch => {
    dispatch({
        type: types.BINANCE_PAY,
        payload:data
    })
}

export const editTransfer = () => dispatch => {
    dispatch({
        type: types.EDIT_TRANSFER
    })
}