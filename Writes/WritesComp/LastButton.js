/** @format */

import React, { useContext } from 'react';
import { Button } from 'native-base';
import { ExpenseContext } from '../../InterComp/ContextFile';

const LastButton = () => {
	const { id, type, handleSubmit, handleUpdate } = useContext(ExpenseContext);
	return id ? (
		<Button
			size='lg'
			variant='outline'
			colorScheme='primary'
			m={10}
			onPress={() => {
				handleUpdate(id, type);
			}}>
			UPDATE
		</Button>
	) : (
		<Button
			size='lg'
			variant='outline'
			colorScheme='primary'
			m={10}
			onPress={() => {
				handleSubmit();
			}}>
			SUBMIT
		</Button>
	);
};

export default LastButton;
