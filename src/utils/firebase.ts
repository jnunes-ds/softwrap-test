import firebase from "firebase";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyBQ3jDJ_jT1cYFhtWgR7n11Cqs_ptSOrys",
    authDomain: "softwrap-test-3b16d.firebaseapp.com",
    projectId: "softwrap-test-3b16d",
    storageBucket: "softwrap-test-3b16d.appspot.com",
    messagingSenderId: "714109861651",
    appId: "1:714109861651:web:1cb249ae34d8973341e4e6",
    measurementId: "G-PB9RYH5GCZ"
};

if(!firebase.apps.length){
    firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export { firestore };