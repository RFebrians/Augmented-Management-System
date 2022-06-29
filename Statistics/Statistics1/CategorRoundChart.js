/** @format */

import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStatistics1 } from '../../reduxBase/actions/dataAction';
import { useDispatch } from 'react-redux';
import PieComp from './PieComp';
import { Contain } from '../../InterComp/ReadyComp';
import { Heading, Button, ScrollView, Text, VStack } from 'native-base';
import RangeComp from '../Statistics2/RangeComp';
import moment from 'moment';

const CategorRoundChart = ({ datak = [], title, type }) => {
	const dispatch = useDispatch();
	const [start, setStart] = useState(new Date() - 604800000);
	const [end, setEnd] = useState(new Date());
	const [showModal, setShowModal] = useState(false);

	useFocusEffect(
		useCallback(() => {
			dispatch(getStatistics1(start, end, type));
		}, [dispatch])
	);
	const setDajs = (one, two) => {
		setStart(one);
		setEnd(two);
		dispatch(getStatistics1(one, two, type));
	};

	return (
		<ScrollView style={styles.contai}>
			<View style={styles.container}>
				<Heading
					textAlign='center'
					size='md'
					italic
					color='blueGray.200'
					mt={8}
					mb={5}>
					{title}
				</Heading>
				<Contain stylek={{ minHeight: 500 }}>
					<Heading size='sm' italic color='blueGray.200'>
						Time from: {moment(start).format('MMM Do YY')} to{' '}
						{moment(end).format('MMM Do YY')}
					</Heading>
					{datak.length > 0 ? (
						<PieComp title={'Purchase during last week'} datak={datak} />
					) : (
						<VStack style={styles.vstack} justifyContent='center'>
							<Text fontSize={30} color='coolGray.200'>
								No Data
							</Text>
						</VStack>
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
					<RangeComp
						start={start}
						end={end}
						setDajs={setDajs}
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</Contain>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		alignItems: 'center',
		position: 'relative'
	},
	contai: {
		backgroundColor: '#111827',
		flex: 1
	},
	button: {
		marginTop: 20
	},
	vstack: { marginTop: 30 }
});

export default CategorRoundChart;
