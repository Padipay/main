import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import transferReducer from '../transfer/reducers';

const rootReducer = combineReducers({
    transfer_details: transferReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
