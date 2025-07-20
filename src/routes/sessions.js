import express from 'express';
import { UserController } from '../controllers/UserController.js';
import passport from 'passport';

const router = express.Router();
const userController = new UserController();

// Registro de usuario
router.post('/register', userController.register.bind(userController));

// Login
router.post('/login', userController.login.bind(userController));

// Ruta protegida: /current (usa DTO para no enviar información sensible)
router.get('/current', passport.authenticate('jwt', { session: false }), userController.getCurrentUser.bind(userController));

// Recuperación de contraseña
router.post('/forgot-password', userController.requestPasswordReset.bind(userController));
router.post('/reset-password', userController.resetPassword.bind(userController));

export default router; 