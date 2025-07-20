import Product from '../models/Product.js';

export class ProductDAO {
  async create(productData) {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw new Error(`Error finding product by ID: ${error.message}`);
    }
  }

  async findByCode(code) {
    try {
      return await Product.findOne({ code });
    } catch (error) {
      throw new Error(`Error finding product by code: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await Product.find({ status: true });
    } catch (error) {
      throw new Error(`Error finding all products: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      return await Product.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  async updateStock(id, quantity) {
    try {
      const product = await this.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      
      if (product.stock < quantity) {
        throw new Error('Insufficient stock');
      }
      
      product.stock -= quantity;
      return await product.save();
    } catch (error) {
      throw new Error(`Error updating stock: ${error.message}`);
    }
  }

  async findByCategory(category) {
    try {
      return await Product.find({ category, status: true });
    } catch (error) {
      throw new Error(`Error finding products by category: ${error.message}`);
    }
  }
} 