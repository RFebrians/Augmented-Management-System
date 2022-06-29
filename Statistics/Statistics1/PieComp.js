/** @format */

import React from 'react';
import { VictoryPie, VictoryLegend, VictoryContainer } from 'victory-native';

const PieComp = ({ datak }) => {
	return (
		<>
			<VictoryPie
				colorScale={'qualitative'}
				data={datak}
				height={280}
				width={280}
				innerRadius={65}
				padAngle={3}
				style={{ labels: { fontSize: 12, fill: '#FFFFFF' } }}
				animate={{ duration: 3000 }}
				labels={({ datum }) => {
					const kro = datak.reduce((one, two) => {
						return one + two.y;
					}, 0);
					const kro2 = (datum.y / kro) * 100;
					return `${kro2.toFixed(1)}%`;
				}}
			/>
			<VictoryContainer height={datak.length * 20} width={350}>
				<VictoryLegend
					x={40}
					y={0}
					colorScale={'qualitative'}
					centerTitle
					orientation='horizontal'
					gutter={30}
					itemsPerRow={2}
					style={{
						title: { fontSize: 15, fill: '#FFFFFF' },
						labels: { fontSize: 14, fill: '#FFFFFF' }
					}}
					data={datak.map((item) => {
						return { name: item.x };
					})}
				/>
			</VictoryContainer>
		</>
	);
};

export default PieComp;
