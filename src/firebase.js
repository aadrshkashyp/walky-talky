import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxK-fUyCPijjvAQ1C2paX__AYUdB-zepU",
  authDomain: "walky-talky-5b902.firebaseapp.com",
  projectId: "walky-talky-5b902",
  storageBucket: "walky-talky-5b902.appspot.com",
  messagingSenderId: "1019105292584",
  appId: "1:1019105292584:web:caa4519957e53b869f201d",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
