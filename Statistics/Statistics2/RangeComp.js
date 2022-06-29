/** @format */

import { Button, Modal, FormControl, Text } from 'native-base';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { View } from 'react-native';

const RangeComp = ({ start, end, setDajs, showModal, setShowModal }) => {
	const [one, setOne] = useState(start);
	const [two, setTwo] = useState(end);

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
							<DatePicker mode='date' date={two} onDateChange={setTwo} />
						</FormControl>
					</Modal.Body>
					<Modal.Footer>
						<Button.Group space={2}>
							<Button
								variant='ghost'
								colorScheme='blueGray'
								onPress={() => {
									setShowModal(false);
								}}>
								Cancel
							</Button>
							<Button
								onPress={() => {
									setShowModal(false);
									setDajs(one, two);
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

export default RangeComp;
