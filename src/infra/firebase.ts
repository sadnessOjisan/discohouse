import "firebase/auth";
import "firebase/firestore";

import fb from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCDOK1YAUI16BUUGo0szc01RNQNHY72oGM",
  authDomain: "discohouse-7e123.firebaseapp.com",
  projectId: "discohouse-7e123",
  storageBucket: "discohouse-7e123.appspot.com",
  messagingSenderId: "540278284212",
  appId: "1:540278284212:web:bf877a0d7cdd3b8253dce1",
  measurementId: "G-P5DGVWS2R2",
};

// HACK: https://github.com/vercel/next.js/discussions/11351
export const firebase = !fb.apps.length
  ? fb.initializeApp(firebaseConfig)
  : fb.app();

export const auth = firebase.auth();
export const db = firebase.firestore();
