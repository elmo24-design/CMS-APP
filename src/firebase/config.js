import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
   apiKey: "AIzaSyBg-6JqxqLEaIAaG3idk3b8RGux59tHiUs",
   authDomain: "upvote-app-4b6cd.firebaseapp.com",
   projectId: "upvote-app-4b6cd",
   storageBucket: "upvote-app-4b6cd.appspot.com",
   messagingSenderId: "1008327839327",
   appId: "1:1008327839327:web:4037625d19480fc90415ea"
 };

 firebase.initializeApp(firebaseConfig)

 const projectAuth = firebase.auth()
 const projectFirestore = firebase.firestore() //set up connection
 const timestamp = firebase.firestore.FieldValue.serverTimestamp

 export { projectAuth, projectFirestore, timestamp }
