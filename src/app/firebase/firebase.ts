import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT,
  storageBucket: process.env.NEXT_PUBLIC_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MSG,
  appId: process.env.NEXT_PUBLIC_APP
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth();




export {app, db, auth}
