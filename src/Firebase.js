import { initializeApp } from 'firebase/app'
import { getFirestore, collection} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBgQWRpUeA2FdfPsNknjAOlOkHbs1xGZ7o",
  authDomain: "tictactoeonclud.firebaseapp.com",
  projectId: "tictactoeonclud",
  storageBucket: "tictactoeonclud.appspot.com",
  messagingSenderId: "714477085184",
  appId: "1:714477085184:web:28b5982d6f7ce002f1eee5"
};

initializeApp(firebaseConfig)

export const db = getFirestore();
export const auth = getAuth();
