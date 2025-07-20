import Ticket from '../models/Ticket.js';

export class TicketDAO {
  async create(ticketData) {
    try {
      const ticket = new Ticket(ticketData);
      return await ticket.save();
    } catch (error) {
      throw new Error(`Error creating ticket: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await Ticket.findById(id).populate('purchaser').populate('products.product');
    } catch (error) {
      throw new Error(`Error finding ticket by ID: ${error.message}`);
    }
  }

  async findByUser(userId) {
    try {
      return await Ticket.find({ purchaser: userId }).populate('products.product');
    } catch (error) {
      throw new Error(`Error finding tickets by user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await Ticket.find().populate('purchaser').populate('products.product');
    } catch (error) {
      throw new Error(`Error finding all tickets: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      return await Ticket.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error updating ticket: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await Ticket.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting ticket: ${error.message}`);
    }
  }

  async findByCode(code) {
    try {
      return await Ticket.findOne({ code }).populate('purchaser').populate('products.product');
    } catch (error) {
      throw new Error(`Error finding ticket by code: ${error.message}`);
    }
  }
} 