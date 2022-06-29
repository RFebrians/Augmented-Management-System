/** @format */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PurchasesStatistics3 from '../../../Statistics/Statistics3/PurchasesStatistics3';
import IncomesStatistics3 from '../../../Statistics/Statistics3/IncomesStatistics3';

const Tab = createMaterialTopTabNavigator();

const TopStatistics3 = () => {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarStyle: { backgroundColor: '#111827' },
				tabBarInactiveTintColor: 'rgba(200,200,200, 0.5)',
				activeTintColor: 'white',
				tabBarActiveTintColor: 'white'
			})}>
			<Tab.Screen name='Pengeluaran' component={PurchasesStatistics3} />
			<Tab.Screen name='Pembelian' component={IncomesStatistics3} />
		</Tab.Navigator>
	);
};
export default TopStatistics3;
