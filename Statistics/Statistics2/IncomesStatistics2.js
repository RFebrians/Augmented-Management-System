/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import PeriodAllLine from './PeriodAllLine';

const IncomesStatistics2 = () => {
	const datak = useSelector((state) => state.data.statistic2b);
	return (
		<PeriodAllLine
			datak={datak}
			title='Incomes according to category during a specific timeline'
			type='Income'
		/>
	);
};

export default IncomesStatistics2;
