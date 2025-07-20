import { ProductRepository } from '../repositories/ProductRepository.js';

export class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await this.productRepository.findProductById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const product = await this.productRepository.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await this.productRepository.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const result = await this.productRepository.deleteProduct(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const products = await this.productRepository.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
} 