import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "YOUR DATA",
  authDomain: "YOUR DATA",
  projectId: "YOUR DATA",
  storageBucket: "YOUR DATA",
  messagingSenderId: "YOUR DATA",
  appId: "YOUR DATA",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
