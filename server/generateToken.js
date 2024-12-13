import jwt from 'jsonwebtoken';

// Clave secreta (igual a la que tienes en tu .env)
const secret = 'siriusblack';

// Payload del token (puedes personalizarlo según tu lógica)
const payload = {
  id: 1, // ID de usuario (puedes cambiarlo si tienes usuarios reales)
  role: 'admin', // Rol del usuario (puedes modificarlo)
  name: 'Test User', // Nombre del usuario (opcional)
};

// Opciones del token
const options = {
  expiresIn: '1h', // Expira en 1 hora
};

// Generar el token
const token = jwt.sign(payload, secret, options);

console.log('Generated Token:', token);
