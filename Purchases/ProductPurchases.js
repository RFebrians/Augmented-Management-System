/** @format */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { deletePoz, getProd } from '../reduxBase/actions/dataAction';
import { useSelector } from 'react-redux';
import PurchaseItem from './PurchaseComp/PurchaseItem';
import ExpenseWrite from '../Writes/ExpenseWrite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProductPurchaseNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={() => ({
				tabBarActiveTintColor: '#38bdf8',
				headerTintColor: 'white',
				headerTitleAlign: 'center',
				headerStyle: { backgroundColor: '#111827' }
			})}>
			<>
				<Stack.Screen name='Pengeluaran Pembelian' component={Purchases} />
				<Stack.Screen
					options={{ title: 'Rubah Pembelian' }}
					name='Edit'
					component={ExpenseWrite}
				/>
			</>
		</Stack.Navigator>
	);
};

const Purchases = ({ navigation }) => {
	const dispatch = useDispatch();

	const proddd = useSelector((state) => state.data.produkty);
	const final = ({ item }) => {
		const { prodCos, company, product, category, date, allCosts, type, id } =
			item;

		const delet = (id, type, user) => {
			dispatch(deletePoz(id, type, user));
		};
		return (
			<PurchaseItem
				item={{
					prodCos,
					company,
					product,
					category,
					date,
					allCosts,
					type,
					id
				}}
				navigation={navigation}
				delet={delet}
				key={id}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={proddd}
				renderItem={final}
				keyExtractor={(item) => {
					return item.id;
				}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: '#111827',
		flex: 1
	},
	tex: {
		marginHorizontal: 10
	},
	price: {
		position: 'absolute',
		right: '5%',
		top: '50%'
	}
});

export default ProductPurchaseNavigator;
