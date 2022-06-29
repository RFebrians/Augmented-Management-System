/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import PeriodAllLine from './PeriodAllLine';

const PurchasesStatistics2 = () => {
	const datak = useSelector((state) => state.data.statistic2);

	return (
		<PeriodAllLine
			datak={datak}
			title='Incomes according to category during a specific timeline'
			type='Purchase'
		/>
	);
};

export default PurchasesStatistics2;
