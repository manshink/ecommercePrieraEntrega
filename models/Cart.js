import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: String },
      quantity: { type: Number, default: 1 }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart; 