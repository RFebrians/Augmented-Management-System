/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import PeriodAllLine from './PeriodAllLine';

const IncomesStatistics2 = () => {
	const datak = useSelector((state) => state.data.statistic2b);
	return (
		<PeriodAllLine
			datak={datak}
			title='Pemasukan berdasarkan Kategori Spesifik Timeline'
			type='Income'
		/>
	);
};

export default IncomesStatistics2;
