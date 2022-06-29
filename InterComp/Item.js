/** @format */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

const Item = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text>{children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 0.5,
		borderColor: '#4b5563',
		borderRadius: 10,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: '#1f2937'
	}
});

export default Item;
