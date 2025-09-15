// backend/src/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require("../data/Tasks.js");

// GET todas las tareas
router.get("/", (req, res) => {
  res.json(getTasks());
});

// POST nueva tarea
router.post("/", (req, res) => {
  const task = { ...req.body, id: Date.now() };
  createTask(task);
  res.status(201).json({ message: "Tarea creada ✅", task });
});

// PUT actualizar tarea
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  updateTask(id, req.body);
  res.json({ message: "Tarea actualizada ✅" });
});

// DELETE eliminar tarea
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  deleteTask(id);
  res.json({ message: "Tarea eliminada ✅" });
});

module.exports = router;
