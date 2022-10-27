import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import transferReducer from '../transfer/reducers';
import authReducer from '../auth/reducers';

const rootReducer = combineReducers({
    transfer_details: transferReducer,
    auth_details: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
