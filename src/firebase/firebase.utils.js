import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAimFXORSAXeygNNXovSNFfL4JXIRh2RBg",
    authDomain: "crwn-db-e1a10.firebaseapp.com",
    projectId: "crwn-db-e1a10",
    storageBucket: "crwn-db-e1a10.appspot.com",
    messagingSenderId: "1061328959783",
    appId: "1:1061328959783:web:45406cda2b51dd00195102",
    measurementId: "G-L0DQ3C6229"
  }

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get();

//            IMPORTANT!!!!!!
//We are checking if there is any data, if it isn't, create a new user using data from userAuth object
if(!snapShot.exists) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
await userRef.set({
  displayName,
  email,
  createdAt,
  ...additionalData
})
  }
  catch(error) {

    console.log('error creating user', error.message);
  }
}
console.log(' FIREBASE UTILS SNAPSHOT', snapShot);


return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;