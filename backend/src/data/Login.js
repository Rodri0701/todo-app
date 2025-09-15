const fs = require('fs');
const path = require('path');

// Ruta fiable relativa a este archivo
const usuariosPath = path.join(__dirname, 'usuarios.json');

function getUsuarios() {
  try {
    if (!fs.existsSync(usuariosPath)) {
      console.warn('[Login] usuarios.json NO existe en:', usuariosPath);
      return [];
    }

    const data = fs.readFileSync(usuariosPath, 'utf8');
    if (!data) {
      console.warn('[Login] usuarios.json está vacio');
      return [];
    }

    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      console.warn('[Login] usuarios.json no es un array:', parsed);
      return [];
    }

    return parsed;
  } catch (err) {
    console.error('[Login] Error leyendo/parsing usuarios.json:', err);
    return [];
  }
}

function loginUsuario(email, password) {
  console.log(`[Login] intento de login para: "${email}"`);
  const usuarios = getUsuarios();
  console.log(`[Login] usuarios cargados: ${usuarios.length}`);

  // Normalizar email (trim + lowercase) y comparar password como string
  const usuario = usuarios.find(u => {
    const uEmail = (u.email || '').toString().trim().toLowerCase();
    const uPass  = (u.password || '').toString();
    return uEmail === (email || '').toString().trim().toLowerCase()
           && uPass === password.toString();
  });

  console.log('[Login] usuario encontrado:', !!usuario);
  if (usuario) {
    // por seguridad: no devolver password en la respuesta real; aquí lo devuelvo para debug
    return { success: true, message: 'Login exitoso', usuario };
  } else {
    return { success: false, message: 'Email o contraseña incorrectos' };
  }
}

module.exports = { loginUsuario };
