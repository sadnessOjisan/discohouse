import firebase from "firebase";

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCDOK1YAUI16BUUGo0szc01RNQNHY72oGM",
    authDomain: "discohouse-7e123.firebaseapp.com",
    projectId: "discohouse-7e123",
    storageBucket: "discohouse-7e123.appspot.com",
    messagingSenderId: "540278284212",
    appId: "1:540278284212:web:bf877a0d7cdd3b8253dce1",
    measurementId: "G-P5DGVWS2R2",
  };

  firebase.initializeApp(firebaseConfig);
};

export const db = firebase.firestore();
export const auth = firebase.auth();
