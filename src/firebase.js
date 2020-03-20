import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMdg7UwHYXoew6q4y5tFTdVKI8wgezX8M",
  authDomain: "to-do-list-9caf0.firebaseapp.com",
  databaseURL: "https://to-do-list-9caf0.firebaseio.com",
  projectId: "to-do-list-9caf0",
  storageBucket: "to-do-list-9caf0.appspot.com",
  messagingSenderId: "507191758750",
  appId: "1:507191758750:web:199d902a2b0a7e2ab1108f",
  measurementId: "G-07WZ6X2PP7"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
