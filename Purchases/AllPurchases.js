/** @format */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { deletePoz } from '../reduxBase/actions/dataAction';
import { useSelector } from 'react-redux';
import PurchaseItem from './PurchaseComp/PurchaseItem';
import { deletePurch } from '../reduxBase/actions/dataAction';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Incomes from '../Writes/IncomesWrite';
import ExpenseWrite from '../Writes/ExpenseWrite';

const Stack = createNativeStackNavigator();

const AllPurchaseNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={() => ({
				tabBarActiveTintColor: '#38bdf8',
				headerTintColor: 'white',
				headerTitleAlign: 'center',
				headerStyle: { backgroundColor: '#111827' }
			})}>
			<>
				<Stack.Screen name='Pemasukan dan Pengeluaran Anda' component={Purchases} />
				<Stack.Screen name='Rubah Pemasukan' component={ExpenseWrite} />
				<Stack.Screen name='Rubah Pengeluaran' component={Incomes} />
			</>
		</Stack.Navigator>
	);
};

const Purchases = ({ navigation }) => {
	const dispatch = useDispatch();

	const all = useSelector((state) => state.data.all);

	const final = ({ item }) => {
		const { prodCos, company, product, category, date, allCosts, type, id } =
			item;

		const delet = (id, type, user) => {
			dispatch(deletePoz(id, type, user));
			dispatch(deletePurch(id, user));
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
				data={all}
				renderItem={final}
				keyExtractor={(item) => item.id}
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

export default AllPurchaseNavigator;
