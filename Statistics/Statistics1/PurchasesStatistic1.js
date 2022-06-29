/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import CategorRoundChart from './CategorRoundChart';

const PurchasesStatistic1 = () => {
	const datak = useSelector((state) => state.data.statistic1);
	return (
		<CategorRoundChart
			datak={datak}
			title='Purchases according to category during a specific timeline'
			type='Purchase'
		/>
	);
};

export default PurchasesStatistic1;
