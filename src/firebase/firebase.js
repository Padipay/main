// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXuW8OpHfrqdFlc1Uic2aKNL03hmaRIPs",
  authDomain: "padipay-ee645.firebaseapp.com",
  projectId: "padipay-ee645",
  storageBucket: "padipay-ee645.appspot.com",
  messagingSenderId: "139797081936",
  appId: "1:139797081936:web:435ee95788d8d592bf8655",
  measurementId: "G-75Q4J4SWLN"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;