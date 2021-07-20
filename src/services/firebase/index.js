import firebase from 'firebase/app';
import '@firebase/storage';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCtI6bfW2OabzPw49Vu2BxEga8S4H3wFiw',
  authDomain: 'nmhd-b7d71.firebaseapp.com',
  projectId: 'nmhd-b7d71',
  storageBucket: 'nmhd-b7d71.appspot.com',
  messagingSenderId: '817818914158',
  appId: '1:817818914158:web:dba977aa69865d5ef0457f',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
