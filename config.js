import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyAN0B65JcldJPGUCqtxj57OJiX09bNq00M",
    authDomain: "farm-helper-app.firebaseapp.com",
    databaseURL: "https://farm-helper-app.firebaseio.com",
    projectId: "farm-helper-app",
    storageBucket: "farm-helper-app.appspot.com",
    messagingSenderId: "743746905478",
    appId: "1:743746905478:web:98dbbdf1013e899a90b807"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
export const rldb = firebase.database();