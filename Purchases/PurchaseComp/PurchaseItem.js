/** @format */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { HStack, Text } from 'native-base';
import Icon from 'react-native-vector-icons//MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import PruchaseModal from './PruchaseModal';

const PurchaseItem = ({ item, navigation, delet }) => {
	const user = useSelector((state) => state.user.user);
	const [visible, setVisible] = useState(false);
	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	return (
		<View style={styles.zbior}>
			<Text style={styles.tex} fontSize='10' color='coolGray.400'>
				{moment(item.date.seconds * 1000).format('MMM Do YY')}
			</Text>
			<HStack>
				<HStack justifyContent='space-between' width='110%'>
					<HStack>
						<Text style={styles.tex} fontSize='sm' color='blueGray.200'>
							{item.category}
						</Text>
					</HStack>
					<HStack>
						<Text
							style={[styles.text]}
							fontSize='sm'
							px={4}
							color={item.type === 'Products' ? 'red.500' : 'emerald.500'}>
							Rp.{item.allCosts}
						</Text>
						{item.type === 'Products' && (
							<Icon
								onPress={() => showDialog()}
								name='view-list-outline'
								style={styles.icony}
								size={25}
								color='green'
							/>
						)}

						<Icon
							onPress={() =>
								item.type === 'Products'
									? navigation.navigate('Edit', { item })
									: navigation.navigate('Edit2', { item })
							}
							name='comment-edit-outline'
							style={styles.icony}
							size={25}
							color='yellow'
						/>
						<Icon
							onPress={() => delet(item.id, item.type, user)}
							name='delete'
							style={styles.icony}
							size={25}
							color='#900'
						/>
					</HStack>
				</HStack>
			</HStack>
			{item.type === 'Products' && (
				<PruchaseModal
					item={item.prodCos}
					hideDialog={hideDialog}
					visible={visible}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	zbior: {
		borderWidth: 0.5,
		borderColor: '#4b5563',
		borderRadius: 10,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: '#1f2937',
		display: 'flex',
		flexDirection: 'column',
		marginVertical: 5,
		position: 'relative'
	},
	tex: {
		marginHorizontal: 10
	},
	price: {
		position: 'absolute',
		right: '5%',
		top: '50%'
	},
	icony: {
		paddingHorizontal: 4
	}
});

export default PurchaseItem;
