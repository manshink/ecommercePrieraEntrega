import { ProductRepository } from '../repositories/ProductRepository.js';

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(productData) {
    try {
      return await this.productRepository.createProduct(productData);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await this.productRepository.findProductById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      return await this.productRepository.getAllProducts();
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      return await this.productRepository.updateProduct(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await this.productRepository.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      return await this.productRepository.getProductsByCategory(category);
    } catch (error) {
      throw error;
    }
  }

  async updateStock(id, quantity) {
    try {
      return await this.productRepository.updateStock(id, quantity);
    } catch (error) {
      throw error;
    }
  }

  async checkStockAvailability(productId, quantity) {
    try {
      return await this.productRepository.checkStockAvailability(productId, quantity);
    } catch (error) {
      throw error;
    }
  }
}
