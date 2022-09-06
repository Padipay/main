import * as types from './actionTypes';

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
        type: types.PAYMENT
    })
}

export const conversionRates = (rate) => dispatch => {
    dispatch({
        type:types.CONVERSION_RATES,
        payload:rate
    });
};