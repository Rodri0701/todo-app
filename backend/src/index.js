const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hola desde el backend con Node.js 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
