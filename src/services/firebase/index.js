import firebase from 'firebase';
import '@firebase/storage';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCW0WzrzCbuNP8dk5ssVVYokzBXrfI31_k',
  authDomain: 'nmhd-web.firebaseapp.com',
  projectId: 'nmhd-web',
  storageBucket: 'nmhd-web.appspot.com',
  messagingSenderId: '435648192297',
  appId: '1:435648192297:web:06d961acf90a577627a138',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase };
export default storage;
