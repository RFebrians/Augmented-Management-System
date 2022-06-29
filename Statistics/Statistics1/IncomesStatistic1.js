/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import CategorRoundChart from './CategorRoundChart';

const IncomesStatistic1 = () => {
	const datak = useSelector((state) => state.data.statistic1);
	return (
		<CategorRoundChart
			datak={datak}
			title='Incomes according to category during a specific timeline'
			type='Income'
		/>
	);
};

export default IncomesStatistic1;
