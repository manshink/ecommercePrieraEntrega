import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  status: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product; 