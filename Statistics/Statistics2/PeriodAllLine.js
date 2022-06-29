/** @format */

import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStatistics2 } from '../../reduxBase/actions/dataAction';
import { useDispatch } from 'react-redux';
import LineComp from './LineComp';
import { Heading, HStack, Button, ScrollView, Text } from 'native-base';
import RangeComp from './RangeComp';
import { cate, Contain, cate2 } from '../../InterComp/ReadyComp';
import { Divider } from '../../InterComp/ReadyComp';
import CategoryComp from '../../Writes/WritesComp/CategoryComp';
import { ExpenseContext } from '../../InterComp/ContextFile';

const PeriodAllLine = ({ datak = [], title, type }) => {
	const dispatch = useDispatch();
	const [start, setStart] = useState(new Date() - 604800000);
	const [end, setEnd] = useState(new Date());
	const [interwal, setInterwal] = useState(86400000);
	const [showModal, setShowModal] = useState(false);
	const [categoryIcon, setCategoryIcon] = useState('');
	const allCat = 'All Categories';
	const [category, setCategory] = useState(allCat);
	const [visible, setVisible] = useState(false);
	const obj = type === 'Purchase' ? cate : cate2;

	useFocusEffect(
		useCallback(() => {
			dispatch(getStatistics2(start, end, interwal, category, type));
		}, [dispatch])
	);

	const CategoryChange = (cati, catiIcon) => {
		setCategory(cati);
		setCategoryIcon(catiIcon);
		dispatch(getStatistics2(start, end, interwal, cati, type));
	};

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	const iter = datak.length / 10;
	const data1 = [];
	if (iter) {
		for (let i = 0; i < datak.length; i = i + Math.ceil(iter)) {
			if (i > datak.length) {
				break;
			}

			data1.push(datak[i].day);
		}
	}

	const warto = datak.map((item) => {
		return Number(item.sum);
	});

	const setDajs = (one, two) => {
		setStart(one);
		setEnd(two);
		dispatch(getStatistics2(one, two, interwal, category, type));
	};

	if (!warto || !data1) {
		return (
			<View style={styles.container}>
				<Text color='coolGray.300'>Memuat</Text>
			</View>
		);
	} else {
		return (
			<ExpenseContext.Provider
				value={{
					category,
					categoryIcon,
					showDialog,
					hideDialog,
					CategoryChange,
					data1,
					warto,
					obj,
					visible,
					allCat
				}}>
				<ScrollView style={styles.mainContainer}>
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
						<Contain>
							{data1.length === 0 || warto.length === 0 ? (
								<Text fontSize='lg' color='red.500'>
									Ubah berdasarkan Waktu atau Kategori
								</Text>
							) : (
								<LineComp data1={data1} warto={warto} />
							)}
							<Divider></Divider>
							<Divider>Pilih Jangka Waktu:</Divider>
							<HStack width={'100%'} justifyContent={'space-around'}>
								{[
									{ day: 'Days', time: 86400000 },
									{ day: 'Week', time: 604800000 },
									{ day: 'Year', time: 2629746000 }
								].map((item, indx) => {
									return (
										<Button
											key={indx}
											variant='outline'
											colorScheme='primary'
											size='md'
											onPress={() => {
												setShowModal(true);
												setInterwal(item.time);
											}}>
											{item.day}
										</Button>
									);
								})}
							</HStack>
							<RangeComp
								start={start}
								end={end}
								setDajs={setDajs}
								showModal={showModal}
								setShowModal={setShowModal}
							/>
							<Divider></Divider>
							<CategoryComp />
						</Contain>
					</View>
				</ScrollView>
			</ExpenseContext.Provider>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		position: 'relative',
		color: 'black'
	},
	mainContainer: {
		height: '100%',
		backgroundColor: '#111827',
		flex: 1
	}
});

export default PeriodAllLine;
