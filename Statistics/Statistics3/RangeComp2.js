/** @format */

import { Button, Modal, FormControl, Text } from 'native-base';
import React, { useContext, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { View } from 'react-native';
import { ExpenseContext } from '../../InterComp/ContextFile';

const RangeComp2 = () => {
	const {
		startRange1,
		endRange1,
		startRange2,
		endRange2,
		setDajs,
		showModal,
		setShowModal,
		showModal2,
		setShowModal2
	} = useContext(ExpenseContext);
	const [one, setOne] = useState(startRange1);
	const [two, setTwo] = useState(endRange1);
	const [three, setThree] = useState(startRange2);
	const [four, setFour] = useState(endRange2);

	return (
		<View>
			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				size={'full'}>
				<Modal.Content maxWidth='400px'>
					<Modal.CloseButton />
					<Modal.Header>
						<Text italic fontWeight={'bold'} fontSize={23}>
							Chose first date Ranges to comparise
						</Text>
					</Modal.Header>
					<Modal.Body>
						<FormControl>
							<FormControl.Label>
								<Text italic fontSize={'lg'}>
									First Range
								</Text>
							</FormControl.Label>
							<DatePicker
								mode='date'
								date={new Date(one)}
								onDateChange={setOne}
							/>
						</FormControl>
						<FormControl mt='3'>
							<FormControl.Label>
								<Text italic fontSize={'lg'}>
									Last Range
								</Text>
							</FormControl.Label>
							<DatePicker
								mode='date'
								date={new Date(two)}
								onDateChange={setTwo}
							/>
						</FormControl>
					</Modal.Body>
					<Modal.Footer>
						<Button
							onPress={() => {
								setShowModal2(true);
							}}>
							To Next Range
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
			<Modal
				isOpen={showModal2}
				onClose={() => setShowModal2(false)}
				size={'full'}>
				<Modal.Content maxWidth='400px'>
					<Modal.CloseButton />
					<Modal.Header>
						<Text italic fontWeight={'bold'} fontSize={23}>
							Chose Ranges
						</Text>
					</Modal.Header>
					<Modal.Body>
						<FormControl>
							<FormControl.Label>
								<Text italic fontSize={'lg'}>
									First Range
								</Text>
							</FormControl.Label>
							<DatePicker
								mode='date'
								date={new Date(three)}
								onDateChange={setThree}
							/>
						</FormControl>
						<FormControl mt='3'>
							<FormControl.Label>
								<Text italic fontSize={'lg'}>
									Last Range
								</Text>
							</FormControl.Label>
							<DatePicker mode='date' date={four} onDateChange={setFour} />
						</FormControl>
					</Modal.Body>
					<Modal.Footer>
						<Button.Group space={2}>
							<Button
								variant='ghost'
								colorScheme='blueGray'
								onPress={() => {
									setShowModal(false);
									setShowModal2(false);
								}}>
								Cancel
							</Button>
							<Button
								onPress={() => {
									setShowModal(false);
									setShowModal2(false);
									setDajs(one, two, three, four);
								}}>
								Save
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</View>
	);
};

export default RangeComp2;
