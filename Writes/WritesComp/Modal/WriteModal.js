/** @format */

import React, { useContext } from 'react';
import { Modal, Heading, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import ModalItem from './ModalItem';
import { ExpenseContext } from '../../../InterComp/ContextFile';

const Modalek = () => {
	const item = useContext(ExpenseContext);
	const { hideDialog, visible, obj, allCat } = item;
	return (
		<Modal isOpen={visible} onClose={() => hideDialog()}>
			<Modal.Content>
				<Modal.CloseButton />
				<Modal.Header bg='coolGray.800'>
					<Heading italic fontSize='xl' color='coolGray.200'>
						Chose Category
					</Heading>
				</Modal.Header>
				<Modal.Body bg='coolGray.700'>
					{obj.map((item, indx) => (
						<ModalItem key={indx} name={item.name} icon={item.icon} />
					))}
					{allCat ? <ModalItem name={allCat} icon='plus-box-outline' /> : null}
				</Modal.Body>
				<Modal.Footer bg='coolGray.800'>
					<Button
						colorScheme='primary'
						size='md'
						variant='outline'
						onPress={() => hideDialog()}>
						Exit
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
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

export default Modalek;
