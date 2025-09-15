const express = require("express");
const router = express.Router();
const { loginUsuario } = require("../data/Login.js");

// POST /Login -> autenticar usuario
router.post("/", (req, res) => {
  const { email, password } = req.body;

  const resultado = loginUsuario(email, password);

  if (resultado.success) {
    res.status(200).json(resultado);
  } else {
    res.status(401).json(resultado);
  }
});

module.exports = router;
