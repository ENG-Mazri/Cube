import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

//var firebase = require('firebase');
//var firebaseui = require('firebaseui');

const firebaseConfig = {
    apiKey: "AIzaSyBB6uTJwKVM2YVQNd8JSvZhIESIMsaiRo0",
    authDomain: "m24-model-viewer.firebaseapp.com",
    projectId: "m24-model-viewer",
    storageBucket: "m24-model-viewer.appspot.com",
    messagingSenderId: "399344527531",
    appId: "1:399344527531:web:46fe98adb48030b1aa6fee",
    measurementId: "${config.measurementId}"
  };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/*
const querySnapshot = await getDocs(collection(db, "3dmModels"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
*/
// Initialize the FirebaseUI Widget using Firebase.
//var ui = new firebaseui.auth.AuthUI(firebase.auth());
export default db