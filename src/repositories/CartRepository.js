import { CartDAO } from '../daos/CartDAO.js';
import { CartDTO } from '../dtos/CartDTO.js';
import { ProductRepository } from './ProductRepository.js';

export class CartRepository {
  constructor() {
    this.cartDAO = new CartDAO();
    this.productRepository = new ProductRepository();
  }

  async getUserCart(userId) {
    try {
      let cart = await this.cartDAO.findByUser(userId);
      
      if (!cart) {
        cart = await this.cartDAO.create({ user: userId, items: [], total: 0 });
      }
      
      return CartDTO.fromCart(cart);
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(userId, productId, quantity = 1) {
    try {
      // Verificar que el producto existe y tiene stock
      await this.productRepository.checkStockAvailability(productId, quantity);
      
      let cart = await this.cartDAO.findByUser(userId);
      
      if (!cart) {
        cart = await this.cartDAO.create({ user: userId, items: [], total: 0 });
      }
      
      // Verificar si el producto ya está en el carrito
      const existingItem = cart.items.find(item => item.product.toString() === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      
      // Recalcular total
      await this.recalculateCartTotal(cart);
      
      const updatedCart = await this.cartDAO.update(cart._id, cart);
      return CartDTO.fromCart(updatedCart);
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(userId, productId, quantity) {
    try {
      const cart = await this.cartDAO.findByUser(userId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      
      const item = cart.items.find(item => item.product.toString() === productId);
      
      if (!item) {
        throw new Error('Producto no encontrado en el carrito');
      }
      
      if (quantity <= 0) {
        // Eliminar producto del carrito
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
      } else {
        // Verificar stock disponible
        await this.productRepository.checkStockAvailability(productId, quantity);
        item.quantity = quantity;
      }
      
      // Recalcular total
      await this.recalculateCartTotal(cart);
      
      const updatedCart = await this.cartDAO.update(cart._id, cart);
      return CartDTO.fromCart(updatedCart);
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(userId, productId) {
    try {
      const cart = await this.cartDAO.findByUser(userId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      
      // Recalcular total
      await this.recalculateCartTotal(cart);
      
      const updatedCart = await this.cartDAO.update(cart._id, cart);
      return CartDTO.fromCart(updatedCart);
    } catch (error) {
      throw error;
    }
  }

  async clearCart(userId) {
    try {
      const cart = await this.cartDAO.findByUser(userId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      
      cart.items = [];
      cart.total = 0;
      
      const updatedCart = await this.cartDAO.update(cart._id, cart);
      return CartDTO.fromCart(updatedCart);
    } catch (error) {
      throw error;
    }
  }

  async recalculateCartTotal(cart) {
    try {
      let total = 0;
      
      for (const item of cart.items) {
        const product = await this.productRepository.findProductById(item.product);
        if (product) {
          total += product.price * item.quantity;
        }
      }
      
      cart.total = total;
    } catch (error) {
      throw error;
    }
  }
} 