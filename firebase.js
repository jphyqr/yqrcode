import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import * as keys from "./config/keys";

const firebaseConfig = {
  apiKey: keys.firebaseKey,

  authDomain: "yqrcode-bc0f7.firebaseapp.com",
  databaseURL: "https://yqrcode-bc0f7.firebaseio.com",
  projectId: "yqrcode-bc0f7",
  storageBucket: "yqrcode-bc0f7.appspot.com",
  messagingSenderId: "884333052283",
  appId: "1:884333052283:web:7341183e61b3aa4af53dde",
  measurementId: "G-40EDH6RMV7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  firebase.storage();
}

export default firebase;
