/** @format */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExpenseWrite from '../../../Writes/ExpenseWrite';
import Incomes from '../../../Writes/IncomesWrite';
import { item } from '../../../InterComp/DefaultRouteProps';

const Tab = createMaterialTopTabNavigator();

const TopWrite = () => {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarStyle: { backgroundColor: '#111827' },
				tabBarInactiveTintColor: 'rgba(200,200,200, 0.5)',
				activeTintColor: 'white',
				tabBarActiveTintColor: 'white'
			})}>
			<Tab.Screen
				name='Expenses'
				initialParams={item}
				component={ExpenseWrite}
			/>
			<Tab.Screen name='Incomes' initialParams={item} component={Incomes} />
		</Tab.Navigator>
	);
};
export default TopWrite;
