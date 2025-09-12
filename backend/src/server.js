const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const usuarioRoutes = require('./routes/Usuario.js'); // router de usuarios

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // frontend React
app.use(express.json());

// Routers
app.use('/tasks', taskRoutes);
app.use('/NewUsuario', usuarioRoutes); // la ruta final será: /NewUsuario

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
