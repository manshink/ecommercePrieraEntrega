import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = express.Router();

// Obtener carrito del usuario
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id; // Asumiendo que viene del middleware de autenticación
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({ user: userId, items: [], total: 0 });
      await cart.save();
    }
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar producto al carrito
router.post('/:productId', async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity = 1 } = req.body;
    
    // Verificar que el producto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], total: 0 });
    }
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    
    // Calcular total
    cart.total = cart.items.reduce((sum, item) => {
      return sum + (product.price * item.quantity);
    }, 0);
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar cantidad de un producto en el carrito
router.put('/:productId', async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }
    
    item.quantity = quantity;
    
    // Recalcular total
    const product = await Product.findById(productId);
    cart.total = cart.items.reduce((sum, item) => {
      return sum + (product.price * item.quantity);
    }, 0);
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar producto del carrito
router.delete('/:productId', async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    
    // Recalcular total
    cart.total = 0;
    for (let item of cart.items) {
      const product = await Product.findById(item.product);
      cart.total += product.price * item.quantity;
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Vaciar carrito
router.delete('/', async (req, res) => {
  try {
    const userId = req.user.id;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    cart.items = [];
    cart.total = 0;
    await cart.save();
    
    res.json({ message: 'Carrito vaciado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router; 