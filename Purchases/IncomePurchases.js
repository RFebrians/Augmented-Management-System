/** @format */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { deletePoz } from '../reduxBase/actions/dataAction';
import { useSelector } from 'react-redux';
import PurchaseItem from './PurchaseComp/PurchaseItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Incomes from '../Writes/IncomesWrite';

const Stack = createNativeStackNavigator();

const IncomePurchaseNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={() => ({
				tabBarActiveTintColor: '#38bdf8',
				headerTintColor: 'white',
				headerTitleAlign: 'center',
				headerStyle: { backgroundColor: '#111827' }
			})}>
			<>
				<Stack.Screen name='Pemasukan Anda' component={IncomePurchases} />
				<Stack.Screen
					options={{ title: 'Rubah Pemasukan Anda' }}
					name='Edit2'
					component={Incomes}
				/>
			</>
		</Stack.Navigator>
	);
};
const IncomePurchases = ({ navigation }) => {
	const dispatch = useDispatch();

	const inccc = useSelector((state) => state.data.incomes);

	const final = ({ item }) => {
		const { category, date, allCosts, type, id } = item;

		const delet = (id, type, user) => {
			dispatch(deletePoz(id, type, user));
		};
		return (
			<PurchaseItem
				item={{ category, date, allCosts, type, id }}
				navigation={navigation}
				delet={delet}
				key={id}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={inccc}
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

export default IncomePurchaseNavigator;
