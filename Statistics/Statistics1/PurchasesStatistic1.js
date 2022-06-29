/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import CategorRoundChart from './CategorRoundChart';

const PurchasesStatistic1 = () => {
	const datak = useSelector((state) => state.data.statistic1);
	return (
		<CategorRoundChart
			datak={datak}
			title='Pengeluaran berdasarkan Kategori Spesifik Timeline'
			type='Purchase'
		/>
	);
};

export default PurchasesStatistic1;
