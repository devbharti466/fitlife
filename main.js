gsap.registerPlugin(ScrollTrigger);


const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#parent"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#parent", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("#parent").style.transform ? "transform" : "fixed"
});


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();


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
            li.style = "color:white;font-size:3vw;font-family:trebuchet ms;width:47vw; margin-top:10px; margin-bottom:10px;display:flex;justify-content:space-between;";
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
