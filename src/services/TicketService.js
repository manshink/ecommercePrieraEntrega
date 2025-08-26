import { TicketRepository } from '../repositories/TicketRepository.js';

export class TicketService {
  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async processPurchase(userId) {
    try {
      return await this.ticketRepository.processPurchaseFromCart(userId);
    } catch (error) {
      throw error;
    }
  }

  async getTicketById(id) {
    try {
      return await this.ticketRepository.findTicketById(id);
    } catch (error) {
      throw error;
    }
  }

  async getUserTickets(userId) {
    try {
      return await this.ticketRepository.findTicketsByUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async getAllTickets() {
    try {
      return await this.ticketRepository.getAllTickets();
    } catch (error) {
      throw error;
    }
  }

  async updateTicketStatus(id, status) {
    try {
      return await this.ticketRepository.updateTicketStatus(id, status);
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(id) {
    try {
      return await this.ticketRepository.deleteTicket(id);
    } catch (error) {
      throw error;
    }
  }

  async getTicketByCode(code) {
    try {
      return await this.ticketRepository.findTicketByCode(code);
    } catch (error) {
      throw error;
    }
  }
}
