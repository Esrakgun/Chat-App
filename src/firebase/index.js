// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// ! Auth importu:
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// Database İmportu:
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxbP7MatanvpCStovinC_9veUkPfQG_NE",
  authDomain: "chat-app-28ec5.firebaseapp.com",
  projectId: "chat-app-28ec5",
  storageBucket: "chat-app-28ec5.firebasestorage.app",
  messagingSenderId: "269109736677",
  appId: "1:269109736677:web:522a186e695d505f13d00c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! Authentication hizmetinşn referansını al:
export const auth= getAuth(app);


// !Google sağlayıcısının kurulumu:
export const provider = new GoogleAuthProvider();

// DataBase hizmetnin Referansını Al:
export const db=getFirestore(app);