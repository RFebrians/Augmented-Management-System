/** @format */

import React, { useContext } from 'react';
import { Modal, Heading, Text, Button, HStack } from 'native-base';
import { StyleSheet } from 'react-native';

const PruchaseModal = ({ item, hideDialog, visible }) => {
	return (
		<Modal isOpen={visible} onClose={() => hideDialog()}>
			<Modal.Content>
				<Modal.CloseButton />
				<Modal.Header bg='coolGray.800'>
					<Heading italic fontSize='xl' color='coolGray.200'>
						Specific Products
					</Heading>
				</Modal.Header>
				<Modal.Body bg='coolGray.700'>
					{item.map((item, indx) => (
						<HStack key={indx} space={3} style={styles.stack}>
							<Text fontSize='md' color='coolGray.200'>
								{item.produc}
							</Text>
							<Text fontSize='md' color='coolGray.200'>
								{item.costy}
							</Text>
						</HStack>
					))}
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
	stack: {
		padding: 3
	}
});

export default PruchaseModal;
