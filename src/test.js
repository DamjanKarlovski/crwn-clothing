import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('oXAEsG12aZ9438exF6Dg').collection('cartItems').doc('TAUp1UoEzJk882pVdkt8')
//THESE BOTH ARE THE SAME QUERIES
firestore.doc('users/oXAEsG12aZ9438exF6Dg/cartItems/TAUp1UoEzJk882pVdkt8');
firestore.collection('users/oXAEsG12aZ9438exF6Dg/cartItems');