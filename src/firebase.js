// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyD59rhgI5HuLp2LGZnhhUpg3lKNT1wh4MI",

  authDomain: "highcardlowcard-1c76d.firebaseapp.com",

  databaseURL: "https://highcardlowcard-1c76d-default-rtdb.firebaseio.com",

  projectId: "highcardlowcard-1c76d",

  storageBucket: "highcardlowcard-1c76d.appspot.com",

  messagingSenderId: "870633260902",

  appId: "1:870633260902:web:94be781ef259761a996aa7"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;