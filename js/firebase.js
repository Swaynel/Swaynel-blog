// js/firebase.js
// Config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// App setup
edit

System: // App setup
import { initializeApp } from "https://www.gstatic.com/firebase/9.24.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebase/9.24.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebase/9.24.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);