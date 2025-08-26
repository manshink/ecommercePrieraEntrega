import { TicketService } from '../services/TicketService.js';

export class TicketController {
  constructor() {
    this.ticketService = new TicketService();
  }

  async processPurchase(req, res) {
    try {
      const result = await this.ticketService.processPurchase(req.user.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTicketById(req, res) {
    try {
      const ticket = await this.ticketService.getTicketById(req.params.id);
      res.json(ticket);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getUserTickets(req, res) {
    try {
      const tickets = await this.ticketService.getUserTickets(req.user.id);
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTickets(req, res) {
    try {
      const tickets = await this.ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTicketStatus(req, res) {
    try {
      const { status } = req.body;
      const ticket = await this.ticketService.updateTicketStatus(req.params.id, status);
      res.json(ticket);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTicket(req, res) {
    try {
      const result = await this.ticketService.deleteTicket(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTicketByCode(req, res) {
    try {
      const ticket = await this.ticketService.getTicketByCode(req.params.code);
      res.json(ticket);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
} 