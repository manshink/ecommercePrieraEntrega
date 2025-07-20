import express from 'express';
import { CartController } from '../controllers/CartController.js';
import { requireUser } from '../middlewares/authorization.js';
import passport from 'passport';

const router = express.Router();
const cartController = new CartController();

// Todas las rutas de carrito requieren autenticación de usuario
router.use(passport.authenticate('jwt', { session: false }));
router.use(requireUser);

// Obtener carrito del usuario
router.get('/', cartController.getUserCart.bind(cartController));

// Agregar producto al carrito
router.post('/:productId', cartController.addProductToCart.bind(cartController));

// Actualizar cantidad de un producto
router.put('/:productId', cartController.updateProductQuantity.bind(cartController));

// Eliminar producto del carrito
router.delete('/:productId', cartController.removeProductFromCart.bind(cartController));

// Vaciar carrito
router.delete('/', cartController.clearCart.bind(cartController));

export default router; 