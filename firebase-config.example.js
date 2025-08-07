// firebase-config.example.js
// Copy this file to firebase-config.js and replace with your actual Firebase config

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();

// Disable Firestore completely to avoid errors
let db = null;
window.isFirestoreAvailable = false;

// Export for use in other files
window.auth = auth;
window.db = db;

console.log('Firebase Auth initialized successfully');
console.log('Firestore disabled - using Firebase Auth only');