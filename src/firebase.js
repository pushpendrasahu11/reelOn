import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import { getAuth} from 'firebase/auth'

import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import env from "react-dotenv";

const firebaseConfig = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId,
    measurementId: env.measurementId
}
firebase.initializeApp(firebaseConfig);

export const auth = getAuth();


export const firestore = firebase.firestore();
export const database ={
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage();

