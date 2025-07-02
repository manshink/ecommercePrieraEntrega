import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

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