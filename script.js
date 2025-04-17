const taskForm = document.getElementById("tasks-form");
const taskList = document.getElementById("task-entry");

// counter variable for task tracking index
let taskIndex = 1;

// for fetching tasks from server when the page loads
window.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("http://localhost:3000/tasks");
    const tasks = await res.json();

    tasks.forEach(task => {
        addTaskToList(task.text, task.index, task._id, task.completed);
        taskIndex = Math.max(taskIndex, task.index + 1);
    });
});

taskForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    console.log(taskText);

    if(taskText !== ""){
        // adds a new task item
        const res = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text: taskText, index: taskIndex})
        });

        const task = await res.json();
        addTaskToList(task.text, task.index, task._id, false);
        taskIndex++;
        taskInput.value = ""; 
    }
});

function addTaskToList(text, index, id, completed) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.textContent = `[${index}] ${text}`;
    if (completed) taskItem.classList.add("completed");

    taskItem.addEventListener("click", async function(){
        console.log("Completed!");
        this.classList.toggle("completed");
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({completed: this.classList.contains("completed")})
        }); 
    });

        taskList.appendChild(taskItem);
}
