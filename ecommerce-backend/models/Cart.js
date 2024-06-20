import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;