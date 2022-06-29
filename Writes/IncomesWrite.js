/** @format */

import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updatePoz } from '../reduxBase/actions/dataAction';
import { useColorModeValue, Input, Heading } from 'native-base';
import { Contain, Divider, cate2 } from '../InterComp/ReadyComp';
import { setInc } from '../reduxBase/actions/dataAction';
import { ExpenseContext } from '../InterComp/ContextFile';
import CategoryComp from './WritesComp/CategoryComp';
import DateComp from './WritesComp/DateComp';
import LastButton from './WritesComp/LastButton';

const Incomes = ({ route, navigation }) => {
	const { item } = route.params;
	const { id, type } = item;
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const date1 = id ? new Date(item.date.seconds * 1000) : item.date;
	const [category, setCategory] = useState(item.category);
	const [categoryIcon, setCategoryIcon] = useState('');
	const [sumar, setSumar] = useState(item.allCosts);
	const [visible, setVisible] = useState(false);
	const [obj, setObj] = useState(cate2);
	const [date, setDate] = useState(date1);
	const [open, setOpen] = useState(false);
	const [priceErr, setPriceErr] = useState(true);

	//--------------TOOGLE THE DIALOG---------

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	//------------MAKING THE SCHEMA FOR THE DATABASE---
	const SchemaFunc = () => {
		class Schema {
			constructor(categoryy, date, allCosts, user, type) {
				this.category = categoryy;
				this.date = new Date(date);
				this.allCosts = allCosts;
				this.user = user;
				this.type = type;
			}
		}
		const schema = new Schema(category, date, Number(sumar), user, 'Incomes');
		return schema;
	};

	//---------------FORM VALIDATION------------
	const validat = () => {
		if (category === '' || sumar === '' || !priceErr) {
			Alert.alert('Alert', 'Some inputs are empty or invalid', [
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ text: 'OK', onPress: () => console.log('OK Pressed') }
			]);
			return true;
		} else {
			return false;
		}
	};
	//---------SUBMIT THE INCOME----------
	const handleSubmit = () => {
		if (validat() === true) {
			return;
		} else {
			dispatch(setInc(SchemaFunc(), user));
			setCategory(item.category);
			setCategoryIcon('');
			setSumar(item.allCosts);
			navigation.navigate('Income');
		}
	};

	//--------UPDATE THE ICOME----------------
	const handleUpdate = (id, type) => {
		if (validat() === true) {
			return;
		} else {
			dispatch(updatePoz(SchemaFunc(), id, type, user));
			navigation.goBack();
		}
	};

	//--------CHANGE THE CATEGORY------------------
	const CategoryChange = (cati, catiIcon) => {
		setCategory(cati);
		setCategoryIcon(catiIcon);
	};

	//-------HANDLE THE PRICE TO THE RIGHT CURRENCY FORMAT AND VALIDATE THE WRONG FORMAT----
	const handlePrice = (e) => {
		const s = e.toString();
		const pattern = /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/;
		let boli = true;
		if (!pattern.test(s)) {
			boli = false;
		} else {
			boli = true;
		}
		const value =
			s.indexOf('.') >= 0
				? s.substr(0, s.indexOf('.')) + s.substr(s.indexOf('.'), 3)
				: s;

		setPriceErr(boli);
		setSumar(value);
	};

	return (
		<ExpenseContext.Provider
			value={{
				setCategory,
				setCategoryIcon,
				hideDialog,
				visible,
				obj,
				setOpen,
				setDate,
				open,
				date,
				category,
				categoryIcon,
				showDialog,
				handleUpdate,
				handleSubmit,
				id,
				type,
				CategoryChange
			}}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View
					backgroundColor={useColorModeValue('gray.800')}
					style={styles.container}>
					<Heading size='lg' italic color='blueGray.200' mt={8} mb={5}>
						Write your Incomes{' '}
					</Heading>
					<Contain
						stylek={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							position: 'relative'
						}}>
						<Divider>Write the amount:</Divider>
						<Input
							type='number'
							color='blueGray.300'
							borderBottomWidth={1.5}
							borderColor='coolGray.700'
							_focus={{ borderColor: 'primary.200' }}
							variant='outline'
							label='cost'
							onChangeText={(e) => (e === '' ? setSumar('') : handlePrice(e))}
							value={sumar === 0 ? '' : sumar.toString()}
							style={[
								styles.inpa2,
								{ position: 'absolute', left: '60%', top: '50%' }
							]}
							keyboardType='numeric'
						/>
					</Contain>
					<DateComp />
					<Contain>
						<CategoryComp />
					</Contain>
					<LastButton />
				</View>
			</ScrollView>
		</ExpenseContext.Provider>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111827',
		alignItems: 'center',
		position: 'relative',
		color: 'black'
	},
	view: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 200,
		height: 50,
		alignItems: 'center'
	},
	inpa: {
		height: 30,
		flexBasis: '60%',
		shadowColor: 'white'
	},
	inpa2: {
		height: 30,
		flexBasis: '20%'
	},
	inpa3: {
		textAlign: 'center'
	},
	mainView: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	butt: {
		height: 50,
		padding: 0,
		justifyContent: 'center',
		borderWidth: 1.5,
		padding: 0
	},
	modal: {
		backgroundColor: 'white',
		position: 'absolute',
		top: '50%',
		left: '50%'
	},
	text: {
		fontSize: 24,
		marginBottom: 30,
		marginTop: 20,
		color: 'white'
	},
	modalView: {
		display: 'flex',
		flexDirection: 'row',
		padding: 5,
		marginBottom: 10,
		alignItems: 'center'
	},
	modalText: {
		marginHorizontal: 20
	},
	divid: {
		marginBottom: 5
	}
});

export default Incomes;
