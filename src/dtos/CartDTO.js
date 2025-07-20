export class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.user = cart.user;
    this.items = cart.items.map(item => ({
      product: item.product ? {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        thumbnail: item.product.thumbnail,
        code: item.product.code
      } : item.product,
      quantity: item.quantity
    }));
    this.total = cart.total;
    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }

  static fromCart(cart) {
    return new CartDTO(cart);
  }

  static fromCartList(carts) {
    return carts.map(cart => new CartDTO(cart));
  }
} 