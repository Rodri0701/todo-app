const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const usuarioRoutes = require("./routes/Usuario.js");
const loginRoutes = require("./routes/LoginRoute.js");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routers
app.use("/tasks", taskRoutes);
app.use("/NewUsuario", usuarioRoutes);
app.use("/Login", loginRoutes);
app.use("/usuarios",  usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
