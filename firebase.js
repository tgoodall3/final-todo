import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/compat/app';




const firebaseConfig = {
    apiKey: "AIzaSyBlz4qyZe4AchB9yLH9lAOmqwhgW0BpqlA",
    authDomain: "to-do-crud-428af.firebaseapp.com",
    projectId: "to-do-crud-428af",
    storageBucket: "to-do-crud-428af.appspot.com",
    messagingSenderId: "277477734521",
    appId: "1:277477734521:web:81a74011f29a44a76e3ca8",
    measurementId: "G-HRGV7K3DHN"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)



