import { CartRepository } from '../repositories/CartRepository.js';

export class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  async getUserCart(userId) {
    try {
      return await this.cartRepository.getUserCart(userId);
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(userId, productId, quantity) {
    try {
      return await this.cartRepository.addProductToCart(userId, productId, quantity);
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(userId, productId, quantity) {
    try {
      return await this.cartRepository.updateProductQuantity(userId, productId, quantity);
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(userId, productId) {
    try {
      return await this.cartRepository.removeProductFromCart(userId, productId);
    } catch (error) {
      throw error;
    }
  }

  async clearCart(userId) {
    try {
      return await this.cartRepository.clearCart(userId);
    } catch (error) {
      throw error;
    }
  }
}
