import express from 'express';
import { ProductController } from '../controllers/ProductController.js';
import { requireAdmin } from '../middlewares/authorization.js';
import passport from 'passport';

const router = express.Router();
const productController = new ProductController();

// Rutas públicas
router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.get('/category/:category', productController.getProductsByCategory.bind(productController));

// Rutas protegidas (solo admin)
router.post('/', passport.authenticate('jwt', { session: false }), requireAdmin, productController.createProduct.bind(productController));
router.put('/:id', passport.authenticate('jwt', { session: false }), requireAdmin, productController.updateProduct.bind(productController));
router.delete('/:id', passport.authenticate('jwt', { session: false }), requireAdmin, productController.deleteProduct.bind(productController));

export default router; 