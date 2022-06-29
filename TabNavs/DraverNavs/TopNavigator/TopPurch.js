/** @format */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllPurchaseNavigator from '../../../Purchases/AllPurchases';
import ProductPurchaseNavigator from '../../../Purchases/ProductPurchases';
import IncomePurchaseNavigator from '../../../Purchases/IncomePurchases';

const Tab = createMaterialTopTabNavigator();

const TopPurch = () => {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarStyle: { backgroundColor: '#111827' },
				tabBarInactiveTintColor: 'rgba(200,200,200, 0.5)',
				activeTintColor: 'white',
				tabBarActiveTintColor: 'white'
			})}>
			<Tab.Screen name='All' component={AllPurchaseNavigator} />
			<Tab.Screen name='Products ' component={ProductPurchaseNavigator} />
			<Tab.Screen name='Income' component={IncomePurchaseNavigator} />
		</Tab.Navigator>
	);
};
export default TopPurch;
