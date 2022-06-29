/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import Statistics3 from './Statistics3';

const IncomesStatistics3 = () => {
	const datak = useSelector((state) => state.data.statistic3);
	return (
		<Statistics3
			datak={datak}
			title='Percentage Rate Of Incomes Estimation During Time Perspective'
			type='Income'
		/>
	);
};

export default IncomesStatistics3;
