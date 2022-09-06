import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyAIbZExD4fcHsF01wyt5-c8ytDmzjW6aXs",
  authDomain: "auth-prueba-3c849.firebaseapp.com",
  projectId: "auth-prueba-3c849",
  storageBucket: "auth-prueba-3c849.appspot.com",
  messagingSenderId: "721567746456",
  appId: "1:721567746456:web:62e2321cbd8e74db5483ed",
});

firebase.firestore().settings({ experimentalForceLongPolling: true });
