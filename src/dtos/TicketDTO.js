export class TicketDTO {
  constructor(ticket) {
    this.id = ticket._id;
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser ? {
      id: ticket.purchaser._id,
      first_name: ticket.purchaser.first_name,
      last_name: ticket.purchaser.last_name,
      email: ticket.purchaser.email
    } : ticket.purchaser;
    this.products = ticket.products.map(item => ({
      product: item.product ? {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        code: item.product.code
      } : item.product,
      quantity: item.quantity,
      price: item.price
    }));
    this.status = ticket.status;
    this.createdAt = ticket.createdAt;
    this.updatedAt = ticket.updatedAt;
  }

  static fromTicket(ticket) {
    return new TicketDTO(ticket);
  }

  static fromTicketList(tickets) {
    return tickets.map(ticket => new TicketDTO(ticket));
  }
} 