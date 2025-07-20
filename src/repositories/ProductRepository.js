import { ProductDAO } from '../daos/ProductDAO.js';
import { ProductDTO } from '../dtos/ProductDTO.js';

export class ProductRepository {
  constructor() {
    this.productDAO = new ProductDAO();
  }

  async createProduct(productData) {
    try {
      // Verificar que el código del producto sea único
      const existingProduct = await this.productDAO.findByCode(productData.code);
      if (existingProduct) {
        throw new Error('El código del producto ya existe');
      }

      const product = await this.productDAO.create(productData);
      return ProductDTO.fromProduct(product);
    } catch (error) {
      throw error;
    }
  }

  async findProductById(id) {
    try {
      const product = await this.productDAO.findById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return ProductDTO.fromProduct(product);
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await this.productDAO.findAll();
      return ProductDTO.fromProductList(products);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      // Si se está actualizando el código, verificar que sea único
      if (updateData.code) {
        const existingProduct = await this.productDAO.findByCode(updateData.code);
        if (existingProduct && existingProduct._id.toString() !== id) {
          throw new Error('El código del producto ya existe');
        }
      }

      const product = await this.productDAO.update(id, updateData);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return ProductDTO.fromProduct(product);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.productDAO.delete(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return { message: 'Producto eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }

  async updateStock(id, quantity) {
    try {
      const product = await this.productDAO.updateStock(id, quantity);
      return ProductDTO.fromProduct(product);
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      const products = await this.productDAO.findByCategory(category);
      return ProductDTO.fromProductList(products);
    } catch (error) {
      throw error;
    }
  }

  async checkStockAvailability(productId, quantity) {
    try {
      const product = await this.productDAO.findById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      
      if (product.stock < quantity) {
        throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }
} 