/** @format */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { login, clear_validation_err } from '../reduxBase/actions/userAction';
import { LogBox } from 'react-native';
import { Button, FormControl, Heading, Input, Stack, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

LogBox.ignoreLogs(['Setting a timer']);

const initErr = {
	password: false,
	email: false
};

const Login = ({ navigation }) => {
	const { logError } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [error, setError] = useState(initErr);
	const [state, setState] = useState({
		email: '',
		password: ''
	});

	//----------CHANGE THE STATE AFTER TYPING THE DATA----
	const handleChange = (e, status) => {
		setState({ ...state, [status]: e });
	};

	//----------SUBMIT THE LOGIN ACTION----
	const handleSubmit = () => {
		if (handleErrors() > 0) {
			return;
		}
		dispatch(login(state));
	};

	//---------VALIDATE ALL ERRORS-----------
	const handleErrors = () => {
		let errorsy = { ...initErr };
		let errorNum = 0;

		if (!state.password) {
			errorsy = { ...errorsy, password: true };
			errorNum++;
		}
		if (!state.email) {
			errorsy = { ...errorsy, email: true };
			errorNum++;
		}
		setError(errorsy);

		return errorNum;
	};

	//-----CLEAR ALL VALIDATION ERRORS IN REDUX AFFTER LEAVING-----
	useFocusEffect(
		useCallback(() => {
			return () => {
				dispatch(clear_validation_err());
			};
		}, [dispatch])
	);
	//------------------------------------

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.mincontainer}>
				<FormControl isRequired>
					<Heading italic color='coolGray.300' style={styles.text}>
						Login user
					</Heading>
					<Input
						style={styles.input}
						placeholder='Username'
						onChangeText={(e) => handleChange(e, 'email')}
						value={state.email}
						name='email'
						borderBottomWidth={1.5}
						borderColor='coolGray.300'
						_focus={{ borderColor: 'primary.200' }}
						isFullWidth={true}
						variant='outline'
						color='coolGray.300'
						mt={10}
					/>
					{error.email && (
						<Text style={styles.errText}>Silahkan masukkan username</Text>
					)}
					<Input
						style={styles.input}
						onChangeText={(e) => handleChange(e, 'password')}
						value={state.password}
						placeholder='Password'
						type='password'
						name='password'
						borderBottomWidth={1.5}
						borderColor='coolGray.300'
						_focus={{ borderColor: 'primary.200' }}
						isFullWidth={true}
						variant='outline'
						color='coolGray.300'
						my={4}
					/>
					{error.password && (
						<Text style={styles.errText}>Silahkan masukkan password</Text>
					)}
					{logError ===
						'[auth/invalid-email] The email address is badly formatted.' &&
						!error.password &&
						!error.email &&
						!error.confirmPassword && (
							<Text style={styles.errText}>Email Salah</Text>
						)}
					{logError ===
						'[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.' &&
						!error.password &&
						!error.email &&
						!error.confirmPassword && (
							<Text style={styles.errText}>Tidak Ditemukan Akun</Text>
						)}
					<Stack direction='row' justifyContent='center'>
						<Button
							style={styles.button}
							variant='outline'
							colorScheme='primary'
							size='md'
							mt={5}
							mb={5}
							onPress={handleSubmit}>
							Submit
						</Button>
					</Stack>
					<Stack alignItems='center' justifyContent='center' direction='row'>
						<Text mr={3} fontSize='sm' color='coolGray.300'>
							Belum punya akun ?
						</Text>
						<TouchableOpacity onPress={() => navigation.push('SignUp')}>
							<Text fontSize='md' color='primary.500'>
								Daftar
							</Text>
						</TouchableOpacity>
					</Stack>
				</FormControl>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111827',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mincontainer: {
		height: 400,
		width: '80%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderWidth: 0.5,
		borderColor: '#4b5563',
		borderRadius: 10,
		paddingHorizontal: 40,
		paddingVertical: 40,
		backgroundColor: '#1f2937'
	},
	text: {
		fontSize: 30,
		textAlign: 'center'
	},
	log: {
		fontSize: 30,
		color: 'green'
	},
	input: {
		padding: 0,
		height: 40,
		fontSize: 15
	},
	button: {
		margin: 'auto',
		width: '60%'
	},
	errText: {
		color: 'red',
		marginVertical: 0
	}
});

export default Login;
