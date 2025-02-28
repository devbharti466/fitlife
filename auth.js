// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMmF_FohqS60yLIVs3KNWAFTnH7EWAhMI",
  authDomain: "studysync-9ba73.firebaseapp.com",
  projectId: "studysync-9ba73",
  storageBucket: "studysync-9ba73.firebasestorage.app",
  messagingSenderId: "390754530788",
  appId: "1:390754530788:web:103c93e185db0f1cad03f1",
  measurementId: "G-DEV9KS8CDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
   var messageDiv=document.getElementById(divId);
   messageDiv.style.display="block";
   messageDiv.innerHTML=message;
   messageDiv.style.opacity=1;
   setTimeout(function(){
       messageDiv.style.opacity=0;
    },5000);
}

const data = {
    message: "Initial Message"
};




document.addEventListener("DOMContentLoaded", function () {
    const signUp = document.getElementById('submitSignUp');

    if (signUp) {
        signUp.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('rEmail').value;
            const password = document.getElementById('rPassword').value;
            const firstName = document.getElementById('fName').value;
            
            
            
            const auth = getAuth();
            const db = getFirestore();
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    email: email,
                    Name: firstName
                };
                window.localStorage.setItem("name", firstName);
                window.localStorage.setItem("email", email);
                showMessage('Account Created Successfully', 'signUpMessage');
                const docRef = doc(db, "users", user.uid);
                setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'main.html';
                })
                .catch((error) => {
                    console.error("error writing document", error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == 'auth/email-already-in-use') {
                    showMessage('Email Address Already Exists !!!', 'signUpMessage');
                } else {
                    showMessage('Unable to create User', 'signUpMessage');
                }
            });
            
        });
        
    }
    
    const signIn = document.getElementById('submitSignIn');
    if (signIn) {
        signIn.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
          const auth = getAuth();
          
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              showMessage('Login is successful', 'signInMessage');
              const user = userCredential.user;
              localStorage.setItem('loggedInUserId', user.uid);
              window.location.href = 'index,.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-credential') {
                    showMessage('Incorrect Email or Password', 'signInMessage');
                } else {
                    showMessage('Account does not Exist', 'signInMessage');
                }
            });
        });
    }
});








