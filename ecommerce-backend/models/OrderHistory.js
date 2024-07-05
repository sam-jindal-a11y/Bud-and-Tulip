import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ShipDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'ShipDetails', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      size:  { type: String, required: true }
    }
  ],
  paymentMethod: { type: String, enum: ['cod', 'razorpay'], required: true },
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  codCharge: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  voucherCode: { type: String, default: null }, // New field for voucher code
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'delivered', 'cancelled', 'confirmed'], default: 'pending' , required: true } 
});

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
export default OrderHistory;
