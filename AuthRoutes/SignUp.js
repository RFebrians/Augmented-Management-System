/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { clear_validation_err, signup } from '../reduxBase/actions/userAction';
import { Button, FormControl, Heading, Input, Stack, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const initErr = {
	password: false,
	email: false,
	confirmPassword: false
};

const SignUp = ({ navigation }) => {
	const { logError } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [error, setError] = useState(initErr);
	const [passError, setPassError] = useState(false);
	const [state, setState] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = (e, status) => {
		setState({ ...state, [status]: e });
	};

	useFocusEffect(
		useCallback(() => {
			return () => {
				dispatch(clear_validation_err());
			};
		}, [dispatch])
	);

	const handleSubmit = () => {
		setPassError(false);
		if (handleErrors() > 0) {
			return;
		}
		if (state.password === state.confirmPassword) {
			dispatch(signup(state));
		} else {
			setPassError(true);
		}
	};

	const handleErrors = () => {
		let errorsy = { ...initErr };
		let errorNum = 0;

		if (!state.password) {
			errorsy = { ...errorsy, password: true };
			errorNum++;
		}
		if (!state.confirmPassword) {
			errorsy = { ...errorsy, confirmPassword: true };
			errorNum++;
		}
		if (!state.email) {
			errorsy = { ...errorsy, email: true };
			errorNum++;
		}
		setError(errorsy);

		return errorNum;
	};

	useEffect(() => {
		return () => {
			dispatch(clear_validation_err);
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.mincontainer}>
				<FormControl isRequired>
					<Heading italic color='coolGray.300' style={styles.text}>
						SignUp user
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
						mb={2}
					/>
					{error.email && (
						<Text style={styles.errText}>Please set username in</Text>
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
						my={2}
					/>
					{error.password && (
						<Text style={styles.errText}>Please set password in</Text>
					)}
					<Input
						style={styles.input}
						onChangeText={(e) => handleChange(e, 'confirmPassword')}
						value={state.confirmPassword}
						placeholder='Confrim Password'
						type='password'
						name='confirmPassword'
						borderBottomWidth={1.5}
						borderColor='coolGray.300'
						_focus={{ borderColor: 'primary.200' }}
						isFullWidth={true}
						variant='outline'
						color='coolGray.300'
						my={2}
					/>
					{error.confirmPassword && (
						<Text style={styles.errText}>Please set confirmPassword in</Text>
					)}
					{passError && state.confirmPassword && state.password && (
						<Text style={styles.errText}>The posswords doesnt match</Text>
					)}
					{logError ===
						'[auth/invalid-email] The email address is badly formatted.' &&
						!error.password &&
						!error.email &&
						!error.confirmPassword &&
						!passError && <Text style={styles.errText}>Invalid Email</Text>}
					{logError ===
						'[auth/email-already-in-use] The email address is already in use by another account.' &&
						!error.password &&
						!error.email &&
						!error.confirmPassword &&
						!passError && (
							<Text style={styles.errText}>Account Already in Use</Text>
						)}
					{logError ===
						'[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]' &&
						!error.password &&
						!error.email &&
						!error.confirmPassword &&
						!passError && (
							<Text style={styles.errText}>
								Password should have at least 6 characters
							</Text>
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
							Having an account?
						</Text>
						<TouchableOpacity onPress={() => navigation.push('Login')}>
							<Text fontSize='md' color='primary.500'>
								Log In
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
		minHeight: '50%',
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

export default SignUp;
