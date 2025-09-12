const express = require('express');
const router = express.Router();
const { guardarUsuarioJSON } = require('../data/Usuarios.js');

// POST /NewUsuario -> crear nuevo usuario
router.post('/', (req, res) => {
    try {
        guardarUsuarioJSON(req.body);
        res.status(200).send({ message: 'Usuario guardado ✅' });
    } catch (error) {
        res.status(500).send({ message: 'Error al guardar usuario', error });
    }
});

module.exports = router;
