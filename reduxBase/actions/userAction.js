/** @format */

import {
	SET_AUTENTICATED,
	SET_UNAUTENTICATED,
	SIGNUP,
	LOGIN,
	LOGOUT,
	SET_VALIDATION_ERR,
	CLEAR_VALIDATION_ERR
} from '../types';
import auth from '@react-native-firebase/auth';

export const set_autenticated = (payload) => (dispatch) => {
	dispatch({ type: SET_AUTENTICATED, payload: payload });
};

export const set_unautenticated = async () => (dispatch) => {
	dispatch({ type: SET_UNAUTENTICATED });
};

export const signup = (payload) => async (dispatch) => {
	const { email, password } = payload;

	try {
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then((data) => {
				const user = data.user.email;
				console.log('User account created & signed in!');
				return dispatch({ type: SIGNUP, payload: user });
			})
			.catch((error) => {
				const errorMessage = error.message;
				dispatch({ type: SET_VALIDATION_ERR, payload: errorMessage });
			});
	} catch (e) {
		console.log(e);
	}
};

export const login = (payload) => async (dispatch) => {
	const { email, password } = payload;
	try {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then((data) => {
				const user = data.user.email;
				console.log('User account created & signed in!');
				return dispatch({ type: LOGIN, payload: user });
			})
			.catch((error) => {
				const errorMessage = error.message;
				dispatch({ type: SET_VALIDATION_ERR, payload: errorMessage });
			});
	} catch (e) {
		console.log(e);
	}
};

export const logout = () => async (dispatch) => {
	auth()
		.signOut()
		.then(() => console.log('User signed out!'));
	return dispatch({ type: LOGOUT });
};

export const clear_validation_err = () => async (dispatch) => {
	dispatch({ type: CLEAR_VALIDATION_ERR });
};
