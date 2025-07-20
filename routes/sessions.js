import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    
    // Crear nuevo usuario
    const user = new User({
      first_name,
      last_name,
      email,
      age,
      password
    });
    
    await user.save();
    
    // Generar JWT para el usuario registrado
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      'secretJWT', 
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message || 'Login fallido' });
    // Generar JWT
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'secretJWT', { expiresIn: '1h' });
    res.json({ token });
  })(req, res, next);
});

// Ruta protegida: /current
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // req.user viene del JWT
  res.json({ user: req.user });
});

export default router; 