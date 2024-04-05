import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mindspeak-ai-2c301.firebaseapp.com",
    projectId: "mindspeak-ai-2c301",
    storageBucket: "mindspeak-ai-2c301.appspot.com",
    messagingSenderId: "804556839310",
    appId: "1:804556839310:web:853a085b6271b2621aacdf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
