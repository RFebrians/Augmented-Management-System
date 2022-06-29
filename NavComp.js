/** @format */

import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './AuthRoutes/Login';
import SignUp from './AuthRoutes/SignUp';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { set_autenticated } from './reduxBase/actions/userAction';
import TabNav from './TabNavs/TabNav';

const Stack = createNativeStackNavigator();

export default function App() {
	const [userr, setUser] = useState('');
	const [initializing, setInitializing] = useState(true);
	const dispatch = useDispatch();

	function onAuthStateChanged(user) {
		setUser(user);
		if (user) {
			dispatch(set_autenticated(user.email));
		}
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return null;

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={() => ({
					headerShown: false
				})}>
				{!userr ? (
					<>
						<Stack.Screen name='SignUp' component={SignUp} />
						<Stack.Screen name='Login' component={Login} />
					</>
				) : (
					<>
						<Stack.Screen
							options={{ headerShown: false }}
							name='AugmentedApp'
							component={TabNav}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
