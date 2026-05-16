const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // temporary storage in memory

// ADD TASK
app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title
    };
    tasks.push(task);
    res.json(task);
});

// GET TASKS
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});