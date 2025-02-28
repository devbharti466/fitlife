// Import Firebase SDK (Ensure Firebase is correctly initialized in your HTML file)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Firebase configuration (Replace with your Firebase project credentials)
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
const db = getFirestore(app);
const taskListRef = collection(db, "tasks");

// Function to Add Task to Firebase
async function addTask() {
    let taskInput = document.getElementById("inputdetail").value.trim();

    if (taskInput === "") {
        alert("Task should not be empty!");
        return;
    }

    try {
        await addDoc(taskListRef, { task: taskInput }); // Store task in Firebase
        document.getElementById("inputdetail").value = ""; // Clear input field
    } catch (error) {
        console.error("Error adding task: ", error);
    }
}

// Function to Delete Task from Firebase
async function deleteTask(taskId) {
    try {
        await deleteDoc(doc(db, "tasks", taskId)); // Remove task from Firebase
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// Function to Fetch and Display Tasks from Firebase
function fetchTasks() {
    const list = document.getElementById("olist");

    onSnapshot(taskListRef, (snapshot) => {
        list.innerHTML = ""; // Clear list before updating

        snapshot.forEach((docSnapshot) => {
            let taskData = docSnapshot.data().task;
            let taskId = docSnapshot.id;

            let li = document.createElement("li");
            li.style = "font-size:3vw;font-family:trebuchet ms;width:47vw; margin-top:10px; margin-bottom:10px;display:flex;justify-content:space-between;";
            li.innerHTML = taskData;

            // Create delete button
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.style = "margin-right:10px; cursor:pointer; border:none; background-color:transparent";
            deleteBtn.onclick = () => deleteTask(taskId);

            // Append elements
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
    });
}

// Run on Page Load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
    fetchTasks(); // Fetch tasks when the page loads
});
