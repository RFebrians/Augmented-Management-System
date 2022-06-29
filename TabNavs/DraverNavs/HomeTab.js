/** @format */

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../Home';
import TopStatistics1 from './TopNavigator/TopStatistics1';
import TopStatistics2 from './TopNavigator/TopStatistics2';
import TopStatistics3 from './TopNavigator/TopStatistics3';

const Drawer = createDrawerNavigator();

const HomeTab = () => {
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
				drawerInactiveTintColor: 'white',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: { backgroundColor: '#111827' }
			}}>
			<Drawer.Screen
				options={{ title: 'Welcome' }}
				name='Home2'
				component={Home}
			/>
			<Drawer.Screen
				options={{ title: 'Statistic #1' }}
				name='Statistic1'
				component={TopStatistics1}
			/>
			<Drawer.Screen
				options={{ title: 'Statistic #2' }}
				name='Statistic2'
				component={TopStatistics2}
			/>
			<Drawer.Screen
				options={{ title: 'Statistic #3' }}
				name='Statistic3'
				component={TopStatistics3}
			/>
		</Drawer.Navigator>
	);
};

export default HomeTab;
