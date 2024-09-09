const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBtXHroQDrYy6QSsZ_X-Pmdczr94lUfAfQ",
    authDomain: "freebee-87a76.firebaseapp.com",
    projectId: "freebee-87a76",
    storageBucket: "freebee-87a76.appspot.com",
    messagingSenderId: "92952853682",
    appId: "1:92952853682:web:7a3a75e23de1bfcad71dab",
    measurementId: "G-89CB0YQG8G"
  };

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const Deals = db.collection("deals");

module.exports = Deals;


