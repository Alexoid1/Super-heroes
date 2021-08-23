import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const projectStorage = firebase.storage();
export const projectFirestore = firebase.firestore();
export const authh = firebase.auth();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
