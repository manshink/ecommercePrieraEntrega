import { TicketDAO } from '../daos/TicketDAO.js';
import { TicketDTO } from '../dtos/TicketDTO.js';
import { ProductRepository } from './ProductRepository.js';
import { CartRepository } from './CartRepository.js';

export class TicketRepository {
  constructor() {
    this.ticketDAO = new TicketDAO();
    this.productRepository = new ProductRepository();
    this.cartRepository = new CartRepository();
  }

  async createTicket(userId, cartItems) {
    try {
      const ticketProducts = [];
      let totalAmount = 0;
      const productsWithInsufficientStock = [];

      // Verificar stock y calcular total
      for (const item of cartItems) {
        const product = await this.productRepository.findProductById(item.product);
        
        if (!product) {
          throw new Error(`Producto ${item.product} no encontrado`);
        }

        if (product.stock < item.quantity) {
          productsWithInsufficientStock.push({
            product: product.title,
            requested: item.quantity,
            available: product.stock
          });
        } else {
          // Producto disponible
          const itemTotal = product.price * item.quantity;
          totalAmount += itemTotal;
          
          ticketProducts.push({
            product: item.product,
            quantity: item.quantity,
            price: product.price
          });
        }
      }

      // Si hay productos con stock insuficiente, crear ticket incompleto
      if (productsWithInsufficientStock.length > 0) {
        const incompleteTicket = await this.ticketDAO.create({
          purchaser: userId,
          products: ticketProducts,
          amount: totalAmount,
          status: 'incomplete',
          incompleteProducts: productsWithInsufficientStock
        });

        return {
          ticket: TicketDTO.fromTicket(incompleteTicket),
          incompleteProducts: productsWithInsufficientStock,
          message: 'Compra procesada parcialmente. Algunos productos no tienen stock suficiente.'
        };
      }

      // Si todo está disponible, crear ticket completo y actualizar stock
      if (ticketProducts.length === 0) {
        throw new Error('No hay productos disponibles para comprar');
      }

      // Actualizar stock de todos los productos
      for (const item of ticketProducts) {
        await this.productRepository.updateStock(item.product, item.quantity);
      }

      // Crear ticket completo
      const completeTicket = await this.ticketDAO.create({
        purchaser: userId,
        products: ticketProducts,
        amount: totalAmount,
        status: 'completed'
      });

      // Vaciar carrito del usuario
      await this.cartRepository.clearCart(userId);

      return {
        ticket: TicketDTO.fromTicket(completeTicket),
        message: 'Compra realizada exitosamente'
      };
    } catch (error) {
      throw error;
    }
  }

  async findTicketById(id) {
    try {
      const ticket = await this.ticketDAO.findById(id);
      if (!ticket) {
        throw new Error('Ticket no encontrado');
      }
      return TicketDTO.fromTicket(ticket);
    } catch (error) {
      throw error;
    }
  }

  async findTicketsByUser(userId) {
    try {
      const tickets = await this.ticketDAO.findByUser(userId);
      return TicketDTO.fromTicketList(tickets);
    } catch (error) {
      throw error;
    }
  }

  async getAllTickets() {
    try {
      const tickets = await this.ticketDAO.findAll();
      return TicketDTO.fromTicketList(tickets);
    } catch (error) {
      throw error;
    }
  }

  async updateTicketStatus(id, status) {
    try {
      const ticket = await this.ticketDAO.update(id, { status });
      if (!ticket) {
        throw new Error('Ticket no encontrado');
      }
      return TicketDTO.fromTicket(ticket);
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(id) {
    try {
      const ticket = await this.ticketDAO.delete(id);
      if (!ticket) {
        throw new Error('Ticket no encontrado');
      }
      return { message: 'Ticket eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }

  async findTicketByCode(code) {
    try {
      const ticket = await this.ticketDAO.findByCode(code);
      if (!ticket) {
        throw new Error('Ticket no encontrado');
      }
      return TicketDTO.fromTicket(ticket);
    } catch (error) {
      throw error;
    }
  }

  async processPurchaseFromCart(userId) {
    try {
      // Obtener carrito del usuario
      const cart = await this.cartRepository.getUserCart(userId);
      
      if (!cart || cart.items.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Procesar la compra
      return await this.createTicket(userId, cart.items);
    } catch (error) {
      throw error;
    }
  }
} 