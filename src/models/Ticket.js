import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Generar código único para el ticket
ticketSchema.pre('save', function(next) {
  if (!this.code) {
    this.code = `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket; 