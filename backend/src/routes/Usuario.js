const express = require('express');
const router = express.Router();
const { guardarUsuarioJSON, traerUsuariosJSON } = require('../data/Usuarios.js');

// POST /NewUsuario -> crear nuevo usuario
router.post('/', (req, res) => {
    try {
        guardarUsuarioJSON(req.body);
        res.status(200).send({ message: 'Usuario guardado ✅' });
    } catch (error) {
        res.status(500).send({ message: 'Error al guardar usuario', error });
    }
});

// GET /usuarios -> devuelve todos los usuarios
router.get("/", (req, res) => {
    try {
        const usuarios = traerUsuariosJSON(); // traemos los usuarios
        res.status(200).json(usuarios);       // los devolvemos como JSON
    } catch (error) {
        res.status(500).send({ message: 'Error al ver los usuarios', error });
    }
});

module.exports = router;
