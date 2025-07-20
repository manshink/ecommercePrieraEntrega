import express from 'express';
import { UserController } from '../controllers/UserController.js';
import { requireAdmin, requireOwnerOrAdmin } from '../middlewares/authorization.js';
import passport from 'passport';

const router = express.Router();
const userController = new UserController();

// Crear usuario (solo admin)
router.post('/', passport.authenticate('jwt', { session: false }), requireAdmin, userController.register.bind(userController));

// Obtener todos los usuarios (solo admin)
router.get('/', passport.authenticate('jwt', { session: false }), requireAdmin, userController.getAllUsers.bind(userController));

// Obtener usuario por ID (admin o propio usuario)
router.get('/:id', passport.authenticate('jwt', { session: false }), requireOwnerOrAdmin, userController.getUserById.bind(userController));

// Actualizar usuario (admin o propio usuario)
router.put('/:id', passport.authenticate('jwt', { session: false }), requireOwnerOrAdmin, userController.updateUser.bind(userController));

// Eliminar usuario (solo admin)
router.delete('/:id', passport.authenticate('jwt', { session: false }), requireAdmin, userController.deleteUser.bind(userController));

export default router; 