import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyD-n45yKVwIWhZSMImo0yUtl9HIgGx83v0",
    authDomain: "todo-ninja-e74f6.firebaseapp.com",
    projectId: "todo-ninja-e74f6",
    storageBucket: "todo-ninja-e74f6.appspot.com",
    messagingSenderId: "903620015484",
    appId: "1:903620015484:web:40b9bb6f1952e3823de0f9",
    measurementId: "G-LBKKV8GXVH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  db.settings({timestampInSnapshots: true});

  export {db, auth};