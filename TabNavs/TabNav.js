/** @format */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './DraverNavs/HomeTab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopPurch from './DraverNavs/TopNavigator/TopPurch';
import TopWrite from './DraverNavs/TopNavigator/TopWrite';

const TabNav = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			screenOptions={() => ({
				headerShown: false
			})}>
			<Tab.Screen
				options={() => ({
					tabBarIcon: ({ color }) => {
						return <Icon name='home' size={25} color={color} />;
					}
				})}
				name='Home'
				component={HomeTab}
			/>
			<Tab.Screen
				options={() => ({
					tabBarIcon: ({ color }) => {
						return <Icon name='pencil' size={25} color={color} />;
					}
				})}
				name='Management'
				component={TopWrite}
			/>
			<Tab.Screen
				options={() => ({
					tabBarIcon: ({ color }) => {
						return <Icon name='coin' size={25} color={color} />;
					}
				})}
				name='Pembiayaan'
				component={TopPurch}
			/>
		</Tab.Navigator>
	);
};

export default TabNav;
