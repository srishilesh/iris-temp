import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBJa_zJDXYOiBB-4whbvXjaxoctwCTKtLk",
    authDomain: "iris-dd529.firebaseapp.com",
    databaseURL: "https://iris-dd529.firebaseio.com",
    projectId: "iris-dd529",
    storageBucket: "iris-dd529.appspot.com",
    messagingSenderId: "342418901563",
    appId: "1:342418901563:web:62330f1b8587b5b5b42a1e",
    measurementId: "G-KD3BG7CJ2K"
};



!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

export const auth = firebase.auth()
export const db = firebase.firestore()
export default firebase