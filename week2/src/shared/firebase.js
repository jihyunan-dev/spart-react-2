import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD3TkkHJUX18hzRD3DqciAbUA2jpTO074",
  authDomain: "sparta-2nd.firebaseapp.com",
  projectId: "sparta-2nd",
  storageBucket: "sparta-2nd.appspot.com",
  messagingSenderId: "393458480656",
  appId: "1:393458480656:web:437810f3a37267a222bc95",
  measurementId: "G-9PVZGN0KHW",
};

const apiKey = firebaseConfig.apiKey;

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, apiKey };
