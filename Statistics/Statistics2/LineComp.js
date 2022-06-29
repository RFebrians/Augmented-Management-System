/** @format */

import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ExpenseContext } from '../../InterComp/ContextFile';
import { Rect, Text as TextSVG, Svg } from 'react-native-svg';

const LineComp = () => {
	const { data1, warto } = useContext(ExpenseContext);
	let [tooltipPos, setTooltipPos] = useState({
		x: 0,
		y: 0,
		visible: false,
		value: 0
	});
	const screenWidth = Dimensions.get('window').width;
	const chartConfig = {
		backgroundGradientFrom: '#1E2923',
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: '#08130D',
		backgroundGradientToOpacity: 0.5,
		color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
		strokeWidth: 2, // optional, default 3
		barPercentage: 0.5,
		useShadowColorFromDataset: false // optional
	};

	const data = {
		labels: data1,
		datasets: [
			{
				data: warto,
				color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
				strokeWidth: 2 // optional
			}
		]
	};
	return (
		<LineChart
			data={data}
			width={screenWidth - 70}
			height={250}
			chartConfig={chartConfig}
			withDots={false}
			verticalLabelRotation={90}
			xLabelsOffset={-30}
			decorator={() => {
				return tooltipPos.visible ? (
					<View>
						<Svg>
							<Rect
								x={tooltipPos.x - 15}
								y={tooltipPos.y + 10}
								width='40'
								height='30'
								fill='#111827'
							/>
							<TextSVG
								x={tooltipPos.x + 5}
								y={tooltipPos.y + 30}
								fill='white'
								fontSize='13'
								textAnchor='middle'>
								{tooltipPos.value}
							</TextSVG>
						</Svg>
					</View>
				) : null;
			}}
			onDataPointClick={(data) => {
				let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

				isSamePoint
					? setTooltipPos((previousState) => {
							return {
								...previousState,
								value: data.value,
								visible: !previousState.visible
							};
					  })
					: setTooltipPos({
							x: data.x,
							value: data.value,
							y: data.y,
							visible: true
					  });
			}}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111827',
		alignItems: 'center',
		//justifyContent: 'center',
		position: 'relative',
		color: 'black'
	}
});

export default LineComp;
