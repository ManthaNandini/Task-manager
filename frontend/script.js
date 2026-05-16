//const API = "https://task-manager-backend-j4mb.onrender.com";
const API = "http://localhost:5000/tasks";

// FETCH TASKS
async function fetchTasks() {
    try {
        const response = await fetch(API);
        const tasks = await response.json();

        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");

            li.innerHTML = `
                ${task.title}
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;

            taskList.appendChild(li);
        });

    } catch (error) {
        console.log("Error fetching tasks:", error);
    }
}

// ADD TASK
async function addTask() {
    const taskInput = document.getElementById("taskInput");

    const value = taskInput.value.trim();
    if (value === "") return;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: value
        })
    });

    taskInput.value = "";
    fetchTasks();
}

// DELETE TASK
async function deleteTask(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    fetchTasks();
}

// LOAD TASKS ON PAGE LOAD
fetchTasks();