/** @format */

import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProd, updatePoz } from '../reduxBase/actions/dataAction';
import { useColorModeValue, Text, Button, Input, Heading } from 'native-base';
import { cate, Contain, Divider } from '../InterComp/ReadyComp';
import { ExpenseContext } from '../InterComp/ContextFile';
import DateComp from './WritesComp/DateComp';
import CategoryComp from './WritesComp/CategoryComp';
import LastButton from './WritesComp/LastButton';

const ExpenseWrite = ({ route, navigation }) => {
	const { item } = route.params;
	const { id, type } = item;
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const date1 = id ? new Date(item.date.seconds * 1000) : item.date;
	const [product, setProduct] = useState(item.prodCos);
	const [company, setCompany] = useState(item.company);
	const [categoryIcon, setCategoryIcon] = useState('');
	const [category, setCategory] = useState(item.category);
	const [sumar, setSumar] = useState(item.allCosts);
	const [obj, setObj] = useState(cate);
	const [visible, setVisible] = useState(false);
	const [date, setDate] = useState(date1);
	const [open, setOpen] = useState(false);

	console.log(date);

	//--------------TOOGLE THE DIALOG---------
	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	//------------MAKING THE SCHEMA FOR THE DATABASE---
	const SchemaFunc = () => {
		const prodCos = product.map((item) => {
			return { ...item, costy: Number(item.costy) };
		});
		class Schema {
			constructor(company, prodCos, categoryy, date, allCosts, user, type) {
				this.company = company;
				this.prodCos = prodCos;
				this.category = categoryy;
				this.date = new Date(date);
				this.allCosts = allCosts;
				this.user = user;
				this.type = type;
			}
		}
		const schema = new Schema(
			company,
			prodCos,
			category,
			date,
			sumar,
			user,
			'Products'
		);
		return schema;
	};

	//------------UPDATING THE PRODUCTS AND COSTS STATE----
	const handleProducts = (e, num, sort, boli) => {
		const proProduct = [...product];
		const newi = proProduct.map((item) => {
			if (item.id === num) {
				if (sort === 'costy') {
					return { ...item, [sort]: e, bol: boli };
				} else {
					return { ...item, [sort]: e };
				}
			} else {
				return item;
			}
		});
		if (sort === 'costy') {
			sumCosty(newi);
		}

		setProduct(newi);
	};

	//-----------INCREMENT THE TOTAL PRICE OF THE PRODUCTS----
	const sumCosty = (item) => {
		const proSumar = item.reduce((total, num) => {
			return total + Number(num.costy);
		}, 0);
		setSumar(proSumar);
	};

	//------------DELETE SPECIFIC PRODUCT-------------------
	const handleDelete = (id) => {
		if (product.length === 1) {
			return Alert.alert('Alert', 'Cannot Delete', [
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ text: 'OK', onPress: () => console.log('OK Pressed') }
			]);
		} else {
			const newi = product.filter((item) => item.id !== id);
			setProduct(newi);
			sumCosty(newi);
		}
	};

	//-------------FORM VALIDATION----------------
	const validat = () => {
		const bol = product.every((item) => {
			return item.produc !== '' || item.costy !== '' || item.bol === false;
		});

		if (!bol || !company || !category) {
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

	//----------SUBMIT THE EXPENSE-----------------------
	const handleSubmit = () => {
		if (validat() === true) {
			return;
		} else {
			dispatch(setProd(SchemaFunc(), user));
			setProduct(item.prodCos);
			setCompany(item.company);
			setCategoryIcon('');
			setCategory(item.category);
			navigation.navigate('Purchases');
		}
	};

	//--------UPDATE THE EXPENSE----------------
	const handleUpdate = (id, type) => {
		if (validat() === true) {
			return;
		} else {
			dispatch(updatePoz(SchemaFunc(), id, type, user));
			navigation.goBack();
		}
	};

	//-------HANDLE THE PRICE TO THE RIGHT CURRENCY FORMAT AND VALIDATE THE WRONG FORMAT----
	const handlePrice = (e, num, sort) => {
		const s = e.toString();
		const pattern = /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/;
		let boli = true;
		if (!pattern.test(e)) {
			boli = false;
		} else {
			boli = true;
		}

		const value =
			s.indexOf('.') >= 0
				? s.substr(0, s.indexOf('.')) + s.substr(s.indexOf('.'), 3)
				: s;
		handleProducts(value, num, sort, boli);
	};

	//--------CHANGE THE CATEGORY------------------
	const CategoryChange = (cati, catiIcon) => {
		setCategory(cati);
		setCategoryIcon(catiIcon);
	};

	let inputs = product.map((item) => {
		const index = product.map((koko) => koko.id).indexOf(item.id);
		return (
			<View key={item.id} style={styles.mainView}>
				<View style={styles.view}>
					<Input
						color='blueGray.300'
						variant='underlined'
						borderBottomWidth={1.5}
						borderColor='coolGray.700'
						_focus={{ borderColor: 'primary.200' }}
						isFullWidth={true}
						label='products'
						onChangeText={(e) => handleProducts(e, item.id, 'produc')}
						value={product[index].produc.toString()}
						style={[styles.inpa, styles.inpa3]}
					/>
					<Input
						color='blueGray.300'
						borderBottomWidth={1.5}
						borderColor='coolGray.700'
						_focus={{ borderColor: 'primary.200' }}
						variant='outline'
						label='cost'
						onChangeText={(e) =>
							e === ''
								? handlePrice('', item.id, 'costy')
								: handlePrice(e, item.id, 'costy')
						}
						value={
							product[index].costy === 0 ? '' : product[index].costy.toString()
						}
						style={styles.inpa2}
						keyboardType='numeric'
					/>
				</View>
				<View>
					<Button
						size='sm'
						ml={5}
						variant='outline'
						colorScheme='danger'
						onPress={() => handleDelete(item.id)}>
						X
					</Button>
				</View>
			</View>
		);
	});

	return (
		<ExpenseContext.Provider
			value={{
				CategoryChange,
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
				type
			}}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View
					backgroundColor={useColorModeValue('gray.800')}
					style={styles.container}>
					<Heading size='lg' italic color='blueGray.200' mt={8} mb={5}>
						Tulis Pengeluaran anda
					</Heading>
					<Contain>
						<Divider>Tujuan</Divider>
						<Input
							color='blueGray.300'
							variant='underlined'
							borderBottomWidth={1.5}
							borderColor='coolGray.700'
							_focus={{ borderColor: 'primary.200' }}
							isFullWidth={true}
							label='company'
							onChangeText={(e) => setCompany(e)}
							value={company}
							style={styles.inpa}
							mb={5}
						/>
					</Contain>
					<DateComp />
					<Contain>
						<Divider>
							Total Biaya: {'  '}
							<Text color='coolGray.300'>
								{Number.isNaN(sumar) === true ? 'invalid values' : sumar + 'Rp'}
							</Text>
						</Divider>
						<Divider></Divider>
						<Divider>Product :</Divider>
						{inputs}
						<Button
							size='md'
							variant='outline'
							colorScheme='primary'
							mt={5}
							onPress={() => {
								setProduct([
									...product,
									{
										produc: '',
										costy: '',
										id: product[product.length - 1].id + 1
									}
								]);
							}}>
							Tambah Product :
						</Button>
					</Contain>
					<Contain>
						<CategoryComp />
					</Contain>
					<LastButton />
				</View>
			</ScrollView>
		</ExpenseContext.Provider>
	);
};
//<TextInput label="Email"/>
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111827',
		alignItems: 'center',
		//justifyContent: 'center',
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
		marginBottom: 10,
		alignItems: 'center'
	},
	modalText: {
		marginHorizontal: 20
	},
	divid: {
		marginBottom: 5
	},
	absIcon: {
		position: 'relative'
	}
});

export default ExpenseWrite;
