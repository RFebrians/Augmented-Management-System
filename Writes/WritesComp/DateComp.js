/** @format */

import React, { useContext } from 'react';
import { Contain } from '../../InterComp/ReadyComp';
import { Divider } from '../../InterComp/ReadyComp';
import { Text, Button } from 'native-base';
import DatePicker from 'react-native-date-picker';
import { ExpenseContext } from '../../InterComp/ContextFile';
import moment from 'moment';

const DateComp = () => {
	const { open, date, setOpen, setDate } = useContext(ExpenseContext);
	return (
		<Contain>
			<Divider>
				Tanggal Pengeluaran:{'  '}
				<Text color='coolGray.300'>{moment(date).format('MMM Do YY')}</Text>
			</Divider>
			<Button
				size='md'
				variant='outline'
				colorScheme='primary'
				mt={5}
				onPress={() => setOpen(true)}>
				Buka Kalender
			</Button>
			<DatePicker
				mode='date'
				modal
				open={open}
				date={date}
				onConfirm={(dat) => {
					setOpen(false);
					setDate(new Date(dat));
				}}
				onCancel={() => {
					setOpen(false);
				}}
			/>
		</Contain>
	);
};

export default DateComp;
