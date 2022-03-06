import * as firebase from 'firebase'
import "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "online-teacher-diary.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };


const app = initializeApp(firebaseConfig);

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

// const imageRef = ref(storage, 'images/yaxis.png')

console.log(firebase.storage())


export { firebase, googleAuthProvider, storage, database as default }