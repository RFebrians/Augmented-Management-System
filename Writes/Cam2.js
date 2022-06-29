/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';
//import OcrEdit from './OcrEdit';
function App() {
	// The path of the picked image
	const [pickedImagePath, setPickedImagePath] = useState('');
	const [result, setResult] = useState(null);

	// This function is triggered when the "Select an image" button pressed
	const showImagePicker = async () => {
		// Ask the user for the permission to access the media library
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Ubah pengaturan izin akses");
			return;
		}
		const options = { allowsEditing: true };
		const result = await ImagePicker.launchImageLibraryAsync(options);
		// Explore the result

		if (!result.cancelled) {
			setPickedImagePath(result.uri);
		}
	};
	const finallyOcr = async () => {
		try {
			const resultFromUri = await MlkitOcr?.detectFromUri(pickedImagePath);
			setResult(resultFromUri);
		} catch (err) {
			console.log(err);
		}
	};

	// This function is triggered when the "Open camera" button pressed
	const openCamera = async () => {
		// Ask the user for the permission to access the camera
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Ubah pengaturan izin akses");
			return;
		}
		const options = { allowsEditing: true };
		const result = await ImagePicker.launchCameraAsync(options);

		// Explore the result

		if (!result.cancelled) {
			setPickedImagePath(result.uri);
		}
	};

	let koko;
	result
		? (koko = result.map((item) => <Text key={item.text}>{item.text}</Text>))
		: null;
	//console.log(koko[0].key);
	return (
		<View style={styles.screen}>
			<View style={styles.buttonContainer}>
				<Button onPress={showImagePicker} title='Select an image' />
				<Button onPress={openCamera} title='Open camera' />
			</View>

			<View style={styles.imageContainer}>
				{pickedImagePath !== '' && (
					<Image source={{ uri: pickedImagePath }} style={styles.image} />
				)}
			</View>
			<Button onPress={finallyOcr} title='OCR' />
			{/*<OcrEdit koko={koko} />*/}
		</View>
	);
}

export default App;

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		width: 400,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	imageContainer: {
		padding: 30
	},
	image: {
		width: 400,
		height: 300,
		resizeMode: 'cover'
	}
});
