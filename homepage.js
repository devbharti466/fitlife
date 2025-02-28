import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

 
    //YOUR COPIED FIREBASE PART SHOULD BE HERE
 //WATCH THIS VIDEO TO LEARN WHAT TO PUT HERE   https://youtu.be/_Xczf06n6x0
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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                // document.getElementById('loggedUserFName').innerText=userData.firstName;
                window.localStorage.setItem("sharedData", `${userData.firstName}`);
console.log("Data set in localStorage"); 


            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

//   const logoutButton=document.getElementById('logout');

//   logoutButton.addEventListener('click',()=>{
//     localStorage.removeItem('loggedInUserId');
//     signOut(auth)
//     .then(()=>{
//         window.location.href='index.html';
//     })
//     .catch((error)=>{
//         console.error('Error Signing out:', error);
//     })
//   })

console.log("hello world");