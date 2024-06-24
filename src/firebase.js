// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkXrTiuiSzB83jtCFoS3Pl0_3AP-IJ1PY",
  authDomain: "scheduler-60c86.firebaseapp.com",
  projectId: "scheduler-60c86",
  storageBucket: "scheduler-60c86.appspot.com",
  messagingSenderId: "796504354790",
  appId: "1:796504354790:web:4bd1584a13c1cca47cb027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };