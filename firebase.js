import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged, sendEmailVerification, signOut,signInWithPopup, GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc,getDocs ,doc, setDoc,updateDoc,serverTimestamp , arrayUnion, arrayRemove ,deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBsbVCEwGBKp_myWXH_LBOoBIrD9mxaRF0",
    authDomain: "fir-form-1a269.firebaseapp.com",
    projectId: "fir-form-1a269",
    storageBucket: "fir-form-1a269.firebasestorage.app",
    messagingSenderId: "322651005752",
    appId: "1:322651005752:web:7346a07cff1d40f4b317cd",
    measurementId: "G-4PSR1V6DR2"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  export { auth,getAuth ,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut,signInWithPopup, GoogleAuthProvider,provider,getFirestore,db ,collection, addDoc,getDocs, doc, setDoc ,updateDoc,serverTimestamp, arrayUnion, arrayRemove,deleteDoc  };