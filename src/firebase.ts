import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAN0B65JcldJPGUCqtxj57OJiX09bNq00M",
    authDomain: "farm-helper-app.firebaseapp.com",
    databaseURL: "https://farm-helper-app.firebaseio.com",
    projectId: "farm-helper-app",
    storageBucket: "farm-helper-app.appspot.com",
    messagingSenderId: "743746905478",
    appId: "1:743746905478:web:d40944776d8b2b5690b807"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth
export const firestore = firebase.firestore()