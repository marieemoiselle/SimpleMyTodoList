const taskForm = document.getElementById("tasks-form");
const taskList = document.getElementById("task-entry");

// counter variable for task tracking index
let taskIndex = 1;

taskForm.addEventListener("submit",function(event) {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    console.log(taskText);

    if(taskText !== ""){
        // adds a new task item
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.textContent = `[${taskIndex}] ${taskText}`;

        taskItem.addEventListener("click", function(){
            console.log("Completed!");
            this.classList.toggle("completed");
        });

        taskList.appendChild(taskItem);
        taskIndex++;
        taskInput.value = "";
    }

});

