import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: String,
  productId: mongoose.Schema.Types.ObjectId,
  productName: String,
  price: Number,
  quantity: Number,
  size: String,
  image: {
    type: String,
  },
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;