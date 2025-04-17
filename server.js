const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Task model
const Task = mongoose.model("Task", {
  text: String,
  index: Number,
  completed: Boolean,
});

// Create task
app.post("/tasks", async (req, res) => {
  const { text, index } = req.body;
  const task = new Task({ text, index, completed: false });
  await task.save();
  res.json(task);
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ index: 1 });
  res.json(tasks);
});

// Update task completion
app.patch("/tasks/:id", async (req, res) => {
  const { completed } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });
  res.json(task);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
