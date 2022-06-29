/** @format */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { logout } from './reduxBase/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Button } from 'native-base';
import { getPurch } from './reduxBase/actions/dataAction';

const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	const handleLogout = async () => {
		dispatch(logout());
	};

	useEffect(() => {
		dispatch(getPurch(user));
	}, [dispatch]);

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
				<Text fontSize='md' color='coolGray.200'>
					Halo {user} 
				</Text>
				<Text fontSize={25} mb={5} color='coolGray.200'>
				Selamat Datang di Augmented Management System
				</Text>
				<Text fontSize={10} mb={5} color='coolGray.200'>
				Dari sini Anda dapat mengelola atau memvisualisasikan untuk melacak data Anda
				</Text>
				<Button variant='outline' onPress={handleLogout}>
					Sign Out
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#111827',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputsContainer: {
		borderWidth: 0.5,
		borderColor: '#4b5563',
		borderRadius: 10,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: '#1f2937',
		display: 'flex',
		alignItems: 'center',
		width: '85%',
		shadowColor: 'white',
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 2,
		marginBottom: 10
	}
});

export default Home;
