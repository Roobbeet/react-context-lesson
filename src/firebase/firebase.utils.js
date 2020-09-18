import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
  apiKey: "AIzaSyDZktmUyJ6istoE43jya4lrsDNFRA8UwXU",
  authDomain: "ecommercedb-a20e3.firebaseapp.com",
  databaseURL: "https://ecommercedb-a20e3.firebaseio.com",
  projectId: "ecommercedb-a20e3",
  storageBucket: "ecommercedb-a20e3.appspot.com",
  messagingSenderId: "939015106158",
  appId: "1:939015106158:web:ac25604d7e874c6993c07f",
  measurementId: "G-R5BPJ50DLG"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
