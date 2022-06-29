/** @format */

import React, { useState, useCallback } from 'react';
import { Contain } from '../../InterComp/ReadyComp';
import { StyleSheet, View } from 'react-native';
import { Divider, Heading, Text, VStack, Button, HStack } from 'native-base';
import { ExpenseContext } from '../../InterComp/ContextFile';
import { useFocusEffect } from '@react-navigation/native';
import { getStatistics3 } from '../../reduxBase/actions/dataAction';
import RangeComp2 from './RangeComp2';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const Statistics3 = ({ datak = [], title, type }) => {
	const [startRange1, setStartRange1] = useState(new Date() - 2629746000 * 2);
	const [endRange1, setEndRange1] = useState(new Date() - 2629746000);
	const [startRange2, setStartRange2] = useState(new Date() - 2629746000);
	const [endRange2, setEndRange2] = useState(new Date());
	const [showModal, setShowModal] = useState(false);
	const [showModal2, setShowModal2] = useState(false);
	const dispatch = useDispatch();

	useFocusEffect(
		useCallback(() => {
			dispatch(
				getStatistics3(startRange1, endRange1, startRange2, endRange2, type)
			);
		}, [dispatch])
	);

	const setDajs = (one, two, three, four) => {
		setStartRange1(one);
		setEndRange1(two);
		setStartRange2(three);
		setEndRange2(four);
		dispatch(getStatistics3(one, two, three, four, type));
	};
	return (
		<ExpenseContext.Provider
			value={{
				startRange1,
				endRange1,
				startRange2,
				endRange2,
				setDajs,
				showModal,
				setShowModal,
				showModal2,
				setShowModal2
			}}>
			<View style={styles.container}>
				<Heading
					textAlign='center'
					size='md'
					italic
					color='blueGray.200'
					mt={8}
					mb={5}>
					{' '}
					{title}
				</Heading>
				<Contain stylek={{ alignItems: 'flex-start' }}>
					<VStack mb={5}>
						<VStack mb={3}>
							<Heading size={'sm'} italic color='blueGray.200'>
								First period:
							</Heading>
							<Text fontSize={12} color={'coolGray.200'}>
								{' '}
								{moment(startRange1).format('MMM Do YY')} to{' '}
								{moment(endRange1).format('MMM Do YY')}
							</Text>
						</VStack>
						<VStack>
							<Heading size={'sm'} italic color='blueGray.200'>
								Second period:
							</Heading>
							<Text fontSize={12} color={'coolGray.200'}>
								{moment(startRange2).format('MMM Do YY')} to{' '}
								{moment(endRange2).format('MMM Do YY')}
							</Text>
						</VStack>
					</VStack>
					{datak.length > 0 ? (
						datak.map((item, indx) => (
							<View key={indx}>
								<HStack>
									<Text mb={3} fontSize={15} key={indx} color={'coolGray.200'}>
										{item.x}:{'   '}
									</Text>
									<Text
										fontSize={15}
										color={item.y < 0 ? 'danger.800' : 'emerald.800'}>
										{item.y.toFixed(2)}%
									</Text>
								</HStack>

								<Divider
									bg={'indigo.500'}
									thickness='2'
									orientation='horizontal'
								/>
							</View>
						))
					) : (
						<Text color='red.500'>Change Time Period or Add More Data </Text>
					)}
					<Button
						style={styles.button}
						variant='outline'
						colorScheme='primary'
						size='md'
						onPress={() => {
							setShowModal(true);
						}}>
						Change Range
					</Button>
					<RangeComp2 />
				</Contain>
			</View>
		</ExpenseContext.Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111827',
		alignItems: 'center',
		position: 'relative',
		color: 'black'
	},
	button: {
		marginTop: 20
	}
});

export default Statistics3;
