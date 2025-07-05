import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBkKHooC7L5oHPSJUEjCFO0nswTHzhIp60",
  authDomain: "onlinedeliveryapp-19236.firebaseapp.com",
  projectId: "onlinedeliveryapp-19236",
  storageBucket: "onlinedeliveryapp-19236.appspot.com",
  messagingSenderId: "314147140443",
  appId: "1:314147140443:web:a1ecbe9f3879bdf091607e",
}

const app = initializeApp(firebaseConfig)

// Solo usar Firestore por ahora, sin Auth
const db = getFirestore(app)

export { app, db }
