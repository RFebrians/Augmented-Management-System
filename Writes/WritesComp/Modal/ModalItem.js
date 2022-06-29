/** @format */

import React, { useContext } from 'react';
import { Text, Button } from 'native-base';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ExpenseContext } from '../../../InterComp/ContextFile';

const ModalItem = ({ icon, name }) => {
	const item = useContext(ExpenseContext);
	const { CategoryChange, hideDialog } = item;
	return (
		<TouchableOpacity
			onPress={() => {
				hideDialog();
				CategoryChange(name, icon);
			}}>
			<View style={styles.modalView}>
				<Icon name={icon} size={30} color='#900' />
				<View style={styles.modalText}>
					<Text fontSize='lg' color='coolGray.200'>
						{name}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	modalView: {
		display: 'flex',
		flexDirection: 'row',
		padding: 5,
		marginBottom: 10,
		alignItems: 'center'
	},
	modalText: {
		marginHorizontal: 20
	}
});

export default ModalItem;
