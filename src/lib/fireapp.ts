// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCs0PPA-rAGEv-kvCoF6izVvLnbIUY9iqU",
    authDomain: "web2-lab-7a21a.firebaseapp.com",
    projectId: "web2-lab-7a21a",
    storageBucket: "web2-lab-7a21a.appspot.com",
    messagingSenderId: "237615143843",
    appId: "1:237615143843:web:a8e877162ffa9425955816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const fireapp = {
    app,
    firestore,
};

export default fireapp;