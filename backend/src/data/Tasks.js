// backend/src/data/Tasks.js
const fs = require("fs");
const path = require("path");

const tasksPath = path.join(__dirname, "tasks.json");

// Leer todas las tareas
function getTasks() {
  try {
    const data = fs.existsSync(tasksPath)
      ? fs.readFileSync(tasksPath, "utf-8")
      : "[]";
    return JSON.parse(data);
  } catch (err) {
    console.error("Error al leer tasks.json:", err);
    return [];
  }
}

// Guardar tareas
function saveTasks(tasks) {
  fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
}

// Crear tarea
function createTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}

// Actualizar tarea
function updateTask(id, updatedTask) {
  let tasks = getTasks();
  tasks = tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
  saveTasks(tasks);
}

// Eliminar tarea
function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks(tasks);
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
