const mongoose = require('mongoose');


// Define schema for order history
const OrderHistorySchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  addressId: { type: Schema.Types.ObjectId, ref: 'Address', required: true }, // Reference to Address model
  finalPrice: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod', 'razorpay'], required: true },
  orderDate: { type: Date, default: Date.now }
});

// Create model for order history
const OrderHistory = mongoose.model('OrderHistory', OrderHistorySchema);

export default OrderHistory;
