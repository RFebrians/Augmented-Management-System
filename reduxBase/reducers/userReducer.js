/** @format */

import {
	SET_AUTENTICATED,
	SIGNUP,
	LOGIN,
	LOGOUT,
	SET_VALIDATION_ERR,
	CLEAR_VALIDATION_ERR
} from '../types';

const initialState = {
	autenticated: false,
	user: '',
	logError: ''
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SIGNUP:
			return { autenticated: true, user: action.payload };
		case LOGIN:
			return { autenticated: true, user: action.payload };
		case LOGOUT:
			return { autenticated: false, user: '' };
		case SET_AUTENTICATED:
			return { autenticated: true, user: action.payload };
		case SET_VALIDATION_ERR:
			return { ...state, logError: action.payload };
		case CLEAR_VALIDATION_ERR:
			return { ...state, logError: '' };
		default:
			return state;
	}
}
