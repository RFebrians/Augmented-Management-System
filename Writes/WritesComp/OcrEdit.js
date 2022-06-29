/** @format */

import React from 'react';
import { Text } from 'react-native';

const OcrEdit = ({ koko }) => {
	if (!koko) {
		return <Text>No ocr Image</Text>;
	} else {
		const obr = koko.map((item) => item.key);
		const obr2 = obr.map((item) => item.split(' '));
		console.log(obr2);
		//console.log(arrObr);
		return <Text>{koko}</Text>;
	}
};

export default OcrEdit;
