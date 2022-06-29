/** @format */

import React, { useContext } from 'react';
import { Divider } from '../../InterComp/ReadyComp';
import { HStack, Text, Button, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modalek from './Modal/WriteModal';
import { ExpenseContext } from '../../InterComp/ContextFile';
import { StyleSheet } from 'react-native';

const CategoryComp = () => {
	const { category, categoryIcon, showDialog } = useContext(ExpenseContext);
	return (
		<VStack>
			<HStack>
				<Divider>
					Tipe Kategori:{'   '}
					{category ? (
						<Text fontSize='sm' color='coolGray.200'>
							{category}
							{'     '}
							<Icon name={categoryIcon} size={25} color='#900' />
						</Text>
					) : null}
				</Divider>
			</HStack>
			<HStack justifyContent='center'>
				<Button
					style={styles.button}
					size='md'
					variant='outline'
					colorScheme='primary'
					mt={5}
					onPress={showDialog}>
					Chose Category
				</Button>
			</HStack>
			<Modalek />
		</VStack>
	);
};

const styles = StyleSheet.create({
	button: {
		width: '50%'
	}
});

export default CategoryComp;
