import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDDSBY8wLxwi_CGzRe7yBi2dGyz7nO9wMs",
    authDomain: "web-messanger-9754a.firebaseapp.com",
    projectId: "web-messanger-9754a",
    storageBucket: "web-messanger-9754a.appspot.com",
    messagingSenderId: "510102322883",
    appId: "1:510102322883:web:c86b37a21c5ab29dc9ac76"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };