/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import store from './reduxBase/store';
import NavComp from './NavComp';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { LogBox } from 'react-native';

const theme = extendTheme({
	components: {
		Button: {
			baseStyle: {},
			defaultProps: {},
			variants: {
				approve: ({ colorScheme }) => {
					return {
						bg: `${colorScheme}.500`,
						rounded: 'full'
					};
				}
			},
			sizes: {}
		}
	}
});

export default function App() {
	LogBox.ignoreLogs(['NativeBase:']);
	return (
		<Provider store={store}>
			<NativeBaseProvider theme={theme}>
				<NavComp />
			</NativeBaseProvider>
		</Provider>
	);
}
