const fs = require("fs");
const path = require("path");

// Guardar usuario en JSON
function guardarUsuarioJSON(usuario) {
    const archivo = path.join(__dirname, "usuarios.json"); // siempre dentro de Data
    let data = [];

    if (fs.existsSync(archivo)) {
        const contenido = fs.readFileSync(archivo, "utf-8");
        if (contenido) {
            data = JSON.parse(contenido);
        }
    }

    data.push(usuario);

    fs.writeFileSync(archivo, JSON.stringify(data, null, 2));
    console.log("Usuario guardado ✅");
}

/* Traer a todos los usuarios de un json Existente */
function traerUsuariosJSON() {
    const archivo = path.join(__dirname, "usuarios.json");
    let data = [];

    if (fs.existsSync(archivo)) {
        const contenido = fs.readFileSync(archivo, "utf-8");
        if (contenido) {
            data = JSON.parse(contenido);
        }
    }

    return data;
}

module.exports = { guardarUsuarioJSON , traerUsuariosJSON};
