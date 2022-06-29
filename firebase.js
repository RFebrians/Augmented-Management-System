/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBkqOejg3Je6m75n78ho4S-gdLX3E7VOzw',
	authDomain: 'forwardproject-2bedf.firebaseapp.com',
	projectId: 'forwardproject-2bedf',
	storageBucket: 'forwardproject-2bedf.appspot.com',
	messagingSenderId: '551104926569',
	appId: '1:551104926569:web:52f568ed99c121457223f8',
	measurementId: 'G-XWJDLMC1CE'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//firebase.firestore().settings({ experimentalForceLongPolling: true });
