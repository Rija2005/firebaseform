
// import { auth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     onAuthStateChanged,
//     sendEmailVerification,
//     signOut,
//     signInWithPopup,
//     GoogleAuthProvider,
//     provider,
//     getFirestore,
//     db,
//     collection,
//     addDoc,
//     getDocs,
//     doc,
//     setDoc,
//     updateDoc,serverTimestamp , arrayUnion, arrayRemove,deleteDoc,
// }from "./firebase.js";

import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    getFirestore,
    db,
    doc,
    setDoc,
    deleteDoc,
  } from "./firebase.js";
  
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  
  const showTab = (tabName) => {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(button => button.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
  };
  
  const signUp = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const cPassword = document.getElementById("confirm_pass").value;
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
  
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      if (password !== cPassword) {
        alert("Passwords do not match");
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert("Account created successfully");
  
        await setDoc(doc(db, "users", user.uid), { name, number, email, uId: user.uid });
        console.log("Document written with ID: ", user.uid);
        window.location.href = "./dashboard.html";
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      alert("Invalid email format or password.");
    }
  };
  
  const logIn = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
  
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");
        window.location.href = "./postapp./dashboard.html";
      } catch (error) {
        console.error(error);
        alert("Error logging in: " + error.message);
      }
    } else {
      alert("Invalid email or password format.");
    }
  };
  
  const googleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        number: user.phoneNumber,
      });
      console.log("Document written with ID: ", user.uid);
    } catch (error) {
      console.error("Error during Google sign-up: ", error);
      alert("An error occurred during Google sign-up. Please try again.");
    }
  };
  
  const deleteAccount = async () => {
    const id = auth.currentUser .uid;
    try {
      await deleteDoc(doc(db, "users", id));
      console.log("Account Deleted from Firestore");
      await signOut(auth);
      alert("Account deleted successfully. You have been signed out.");
      window.location.href = "./index.html"; // Redirect to home page
    } catch (error) {
      console.error("Error deleting account: ", error);
    //   alert("An error occurred while deleting the account. Please try again.");
    }
  };
  
  // Event Listeners for Form Actions
  document.getElementById('signUp_btn').addEventListener('click', signUp);
  document.getElementById('login_btn').addEventListener('click', logIn);
  document.getElementById('googleBtn').addEventListener('click', googleSignup);
  document.getElementById('update').addEventListener('click',deleteAccount);

  // Ensure you add the event listeners for the tab buttons
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
      showTab(this.getAttribute('data-tab'));
    });
  });
  