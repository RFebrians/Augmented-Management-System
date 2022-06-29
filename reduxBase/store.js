/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import { composeWithDevTools } from 'remote-redux-devtools';

const reducers = combineReducers({
	user: userReducer,
	data: dataReducer
});

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducers, enhancer);

export default store;
