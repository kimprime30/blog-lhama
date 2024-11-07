// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-30320.firebaseapp.com",
  projectId: "blog-30320",
  storageBucket: "blog-30320.firebasestorage.app",
  messagingSenderId: "7508680071",
  appId: "1:7508680071:web:705b8e39f54d11a6934722",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
