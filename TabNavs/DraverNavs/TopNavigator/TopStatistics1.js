/** @format */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PurchasesStatistic1 from '../../../Statistics/Statistics1/PurchasesStatistic1';
import IncomesStatistic1 from '../../../Statistics/Statistics1/IncomesStatistic1';

const Tab = createMaterialTopTabNavigator();

const TopStatistics1 = () => {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarStyle: { backgroundColor: '#111827' },
				tabBarInactiveTintColor: 'rgba(200,200,200, 0.5)',
				activeTintColor: 'white',
				tabBarActiveTintColor: 'white'
			})}>
			<Tab.Screen name='Pengeluaran' component={PurchasesStatistic1} />
			<Tab.Screen name='Pembelian' component={IncomesStatistic1} />
		</Tab.Navigator>
	);
};
export default TopStatistics1;
