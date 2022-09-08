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
        type: types.PAYMENT
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