import { CartService } from '../services/CartService.js';

export class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async getUserCart(req, res) {
    try {
      const cart = await this.cartService.getUserCart(req.user.id);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { productId } = req.params;
      const { quantity = 1 } = req.body;
      
      const cart = await this.cartService.addProductToCart(req.user.id, productId, quantity);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;
      
      const cart = await this.cartService.updateProductQuantity(req.user.id, productId, quantity);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const { productId } = req.params;
      
      const cart = await this.cartService.removeProductFromCart(req.user.id, productId);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const cart = await this.cartService.clearCart(req.user.id);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
} 