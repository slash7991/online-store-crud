// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANJh-JKLMnrfVZx10KaX5ZPMHB80imOkY",
  authDomain: "assignment-auth-f7d7b.firebaseapp.com",
  projectId: "assignment-auth-f7d7b",
  storageBucket: "assignment-auth-f7d7b.appspot.com",
  messagingSenderId: "12571147159",
  appId: "1:12571147159:web:37d1dce304c07c6897e2d2",
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth };
export { db };
export { storage };
