const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ajusta el path a tasks.json
const tasksFile = path.join(__dirname, '../data/tasks.json');

// GET /tasks
router.get('/', (req, res) => {
  fs.readFile(tasksFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading tasks' });
    const tasks = JSON.parse(data);
    res.json(tasks);
  });
});

/* POST /NewTask*/


module.exports = router;
