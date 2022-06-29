/** @format */

import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Cam2 from './Writes/Cam2';
import ProductPurchaseNavigator from './Purchases/ProductPurchases';
import ExpenseWrite from './Writes/ExpenseWrite';
import OCR from './Writes/Cam2';
import Incomes from './Writes/IncomesWrite';
import IncomePurchasesNavigator from './Purchases/IncomePurchases';
import AllPurchases from './Purchases/AllPurchases';
import { item } from './InterComp/DefaultRouteProps';

const Drawer = createDrawerNavigator();

export default function App() {
	return (
		<Drawer.Navigator
			initialRouteName={Home}
			screenOptions={{
				drawerStyle: {
					backgroundColor: '#111827',
					width: 240,
					color: 'white'
				},
				drawerActiveTintColor: '#93c5fd',
				drawerInactiveTintColor: 'white'
				//	drawerIcon: { focused: true, color: 'white' }
			}}>
			<Drawer.Screen
				options={{ title: 'Home' }}
				name='Home'
				component={Home}
			/>
			<Drawer.Screen
				options={{ title: 'Analisa Pengeluaran' }}
				name='ExpenseWrite'
				component={ExpenseWrite}
				initialParams={item}
			/>
			<Drawer.Screen
				options={{ title: 'Analisa Pengeluaran OCR' }}
				name='Expense Write OCR'
				component={OCR}
			/>
			<Drawer.Screen
				options={{ title: 'Pemasukan' }}
				name='Incomes'
				component={Incomes}
				initialParams={item}
			/>
			<Drawer.Screen
				options={{ title: 'Profit Produk' }}
				name='Product Purchases'
				component={ProductPurchaseNavigator}
			/>
			<Drawer.Screen
				options={{ title: 'Profit Pemasukan' }}
				name='Income Purchases'
				component={IncomePurchasesNavigator}
			/>
			<Drawer.Screen
				options={{ title: 'Semua Profit' }}
				name='All Purchases'
				component={AllPurchases}
			/>
		</Drawer.Navigator>
	);
}
