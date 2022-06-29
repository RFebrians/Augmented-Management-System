/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { View } from 'react-native';

export const Divider = ({ children, stylek }) => {
	return (
		<View style={[styles.view, stylek]}>
			<Text fontSize='sm' color='coolGray.500' italic style={styles.tex}>
				{children}
			</Text>
		</View>
	);
};

export const Contain = ({ children, stylek }) => {
	return <View style={[styles.inputsContainer, stylek]}>{children}</View>;
};

export const cate = [
	{ name: 'Makanan', icon: 'food' },
	{ name: 'Transportasi', icon: 'motorbike' },
	{ name: 'Kesehatan', icon: 'hospital' },
	{ name: 'Hiburan', icon: 'party-popper' },
	{ name: 'Lainnya', icon: 'comment-question-outline' },
	{ name: 'Pakaian', icon: 'tshirt-crew-outline' },
	{ name: 'Umum', icon: 'tshirt-crew-outline' }
];

export const cate2 = [
	{ name: 'Kartu Kredit', icon: 'credit-card' },
	{ name: 'Cash', icon: 'money' }
];

const styles = StyleSheet.create({
	view: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		marginBottom: 5,
		position: 'relative',
		height: 20
	},
	tex: { position: 'absolute' },
	inputsContainer: {
		borderWidth: 0.5,
		borderColor: '#4b5563',
		borderRadius: 10,
		paddingTop: 15,
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
