/** @format */

import firestore from '@react-native-firebase/firestore';
import {
	DELETE_INC,
	DELETE_PURCH,
	GET_PRODUCTS,
	GET_PURCH,
	GET_STATISTICS1,
	UPDATE_INC,
	UPDATE_PROD,
	GET_STATISTICS2,
	GET_STATISTICS2b,
	GET_STATISTICS3,
	GET_STATISTICS1b,
	GET_STATISTICS3b
} from '../types';
import { DELETE_PROD } from '../types';
import { GET_INCOMES } from '../types';

export const setProd = (schema, user) => async (dispatch) => {
	await firestore()
		.collection('Products')
		.add(schema)
		.then(() => {
			console.log('product added');
			dispatch(getPurch(user));
		})
		.catch((err) => console.log(err));
};

export const setInc = (schema, user) => async (dispatch) => {
	await firestore()
		.collection('Incomes')
		.add(schema)
		.then(() => {
			console.log('income added');
			dispatch(getPurch(user));
		})
		.catch((err) => console.log(err));
};

export const getProd = (user) => async (dispatch) => {
	await firestore()
		.collection('Products')
		.where('user', '==', user)
		.get()
		.then((querySnapshot) => {
			const all = [];

			querySnapshot.forEach((doc) => {
				const obj = {
					company: doc.data().company,
					prodCos: doc.data().prodCos,
					user: doc.data().user,
					category: doc.data().category,
					allCosts: doc.data().allCosts,
					date: doc.data().date,
					id: doc.id,
					type: doc.data().type
				};
				all.push(obj);
			});
			return dispatch({
				type: GET_PRODUCTS,
				payload: all
			});
		})
		.catch((err) => console.log(err));
};

export const getInc = (user) => async (dispatch) => {
	await firestore()
		.collection('Incomes')
		.where('user', '==', user)
		.get()
		.then((querySnapshot) => {
			const all = [];

			querySnapshot.forEach((doc) => {
				const obj = {
					user: doc.data().user,
					category: doc.data().category,
					allCosts: doc.data().allCosts,
					date: doc.data().date,
					id: doc.id,
					type: doc.data().type
				};
				all.push(obj);
			});
			return dispatch({
				type: GET_INCOMES,
				payload: all
			});
		})
		.catch((err) => console.log(err));
};

export const getPurch = (user) => async (dispatch) => {
	await Promise.all([dispatch(getInc(user)), dispatch(getProd(user))])
		.then(() => {
			return dispatch({ type: GET_PURCH });
		})
		.catch((err) => console.log(err));
};

export const deletePoz = (id, type, user) => async (dispatch) => {
	await firestore()
		.collection(type)
		.doc(id)
		.delete()
		.then(() => {
			console.log('Product deleted!');
			dispatch({
				type: type === 'Products' ? DELETE_PROD : DELETE_INC,
				payload: id
			});
			dispatch(getPurch(user));
		})
		.catch((err) => console.log(err));
};

export const deletePurch = (id, user) => async (dispatch) => {
	await dispatch({ type: DELETE_PURCH, payload: id });
	await dispatch(getPurch(user));
};

export const updatePoz = (item, id, type, user) => async (dispatch) => {
	console.log(item, id, type, user);
	await firestore()
		.collection(type)
		.doc(id)
		.set(item)
		.then(() => {
			console.log(' updated!');
			dispatch({
				type: type === 'Products' ? UPDATE_PROD : UPDATE_INC,
				payload: { item, id }
			});
			dispatch(getPurch(user));
		})
		.catch((err) => console.log(err));
};

export const getStatistics1 = (start, end, type) => async (dispatch) => {
	return dispatch({
		type: type === 'Purchase' ? GET_STATISTICS1 : GET_STATISTICS1b,
		payload: { start, end }
	});
};

export const getStatistics2 =
	(start, end, interwal, category, type) => async (dispatch) => {
		return dispatch({
			type: type === 'Purchase' ? GET_STATISTICS2 : GET_STATISTICS2b,
			payload: { start, end, interwal, category }
		});
	};

export const getStatistics3 =
	(startRange1, endRange1, startRange2, endRange2, type) =>
	async (dispatch) => {
		return dispatch({
			type: type === 'Purchase' ? GET_STATISTICS3 : GET_STATISTICS3b,
			payload: { startRange1, endRange1, startRange2, endRange2, type }
		});
	};
