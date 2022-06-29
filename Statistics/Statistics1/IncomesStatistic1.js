/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import CategorRoundChart from './CategorRoundChart';

const IncomesStatistic1 = () => {
	const datak = useSelector((state) => state.data.statistic1);
	return (
		<CategorRoundChart
			datak={datak}
			title='Pemasukan berdasarkan Kategori Spesifik Timeline'
			type='Income'
		/>
	);
};

export default IncomesStatistic1;
