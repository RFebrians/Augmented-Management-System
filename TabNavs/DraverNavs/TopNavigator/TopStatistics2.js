/** @format */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PurchasesStatistics2 from '../../../Statistics/Statistics2/PurchasesStatistics2';
import IncomesStatistics2 from '../../../Statistics/Statistics2/IncomesStatistics2';

const Tab = createMaterialTopTabNavigator();

const TopStatistics2 = () => {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarStyle: { backgroundColor: '#111827' },
				tabBarInactiveTintColor: 'rgba(200,200,200, 0.5)',
				activeTintColor: 'white',
				tabBarActiveTintColor: 'white'
			})}>
			<Tab.Screen name='Pengeluaran' component={PurchasesStatistics2} />
			<Tab.Screen name='Pembelian' component={IncomesStatistics2} />
		</Tab.Navigator>
	);
};
export default TopStatistics2;
