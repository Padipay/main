import * as types from './actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    verify_error:null,
    loggedIn: false,
    auth_user: {},
    verify_auth: false,
    transactions: []
};

export default function authReducer (state = initialState, action) {
    switch (action.type) {
        case types.LOADING:
            return{...state, loading:!state.loading};
        case types.LOGGED_IN: 
            return{ ...state, loggedIn:!state.loggedIn};
        case types.AUTH_USER:
            return{...state, auth_user:action.payload}
        case types.TRANSACTIONS:
            return{...state, transactions:action.payload}
        case types.ERROR_MESSAGE:
            return{...state, error:action.payload, loading:false}
        case types.VERIFY_ERROR:
            return{...state, verify_error:action.payload, loading:false}
        case types.VERIFY_AUTH:
            return{...state, verify_auth:!state.verify_auth}
        case types.LOGGED_OUT: 
            return initialState;
        default:
            return state;
    }
}