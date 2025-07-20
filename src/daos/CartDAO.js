import Cart from '../models/Cart.js';

export class CartDAO {
  async create(cartData) {
    try {
      const cart = new Cart(cartData);
      return await cart.save();
    } catch (error) {
      throw new Error(`Error creating cart: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await Cart.findById(id).populate('items.product');
    } catch (error) {
      throw new Error(`Error finding cart by ID: ${error.message}`);
    }
  }

  async findByUser(userId) {
    try {
      return await Cart.findOne({ user: userId }).populate('items.product');
    } catch (error) {
      throw new Error(`Error finding cart by user: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      return await Cart.findByIdAndUpdate(id, updateData, { new: true }).populate('items.product');
    } catch (error) {
      throw new Error(`Error updating cart: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await Cart.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  }
} 