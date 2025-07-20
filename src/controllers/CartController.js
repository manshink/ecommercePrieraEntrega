import { CartRepository } from '../repositories/CartRepository.js';

export class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  async getUserCart(req, res) {
    try {
      const cart = await this.cartRepository.getUserCart(req.user.id);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { productId } = req.params;
      const { quantity = 1 } = req.body;
      
      const cart = await this.cartRepository.addProductToCart(req.user.id, productId, quantity);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;
      
      const cart = await this.cartRepository.updateProductQuantity(req.user.id, productId, quantity);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const { productId } = req.params;
      
      const cart = await this.cartRepository.removeProductFromCart(req.user.id, productId);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const cart = await this.cartRepository.clearCart(req.user.id);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
} 