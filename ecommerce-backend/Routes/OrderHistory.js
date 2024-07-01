// routes/orderHistory.js


import express from 'express';
import OrderHistory from '../models/OrderHistory.js';
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      addressId,
      products,
      paymentMethod,
      totalAmount,
      discount,
      codCharge,
      finalAmount
    } = req.body;

    const newOrder = new OrderHistory({
      userId,
      addressId,
      products,
      paymentMethod,
      totalAmount,
      discount,
      codCharge,
      finalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/orders', async (req, res) => {
    try {
      const orders = await OrderHistory.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get('/orders/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await OrderHistory.find({ userId });
      if (!orders) {
        return res.status(404).json({ message: 'Orders not found for this user' });
      }
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get('/:orderId', async (req, res) => {
    try {
      const order = await OrderHistory.findById(req.params.orderId)
        .populate('userId')
        .populate('ShipDetails')
        .populate('products.productId');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
export default router;
