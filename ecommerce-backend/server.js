import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import verifyToken from './middleware/verifyToken.js';
import cors from 'cors';
import seedRouter from './Routes/SeedRoutes.js';
import authRouter from './Routes/AuthRoutes.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import ShipDetails from './models/ShipDetails.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Static files
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Authentication middleware


// MongoDB connection
mongoose.connect('mongodb+srv://harshil:harsh@cluster0.cbh4pcf.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/seed', seedRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ createdProducts: products });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/cart', async (req, res) => {
  console.log(req.body);
  const { userId, productId, productName, price, quantity, size } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, 'shhhh');
    console.log(decodedToken);
    if (decodedToken.id !== userId) {
      return res.status(403).send('Unauthorized');
    }
    const cartItem = new Cart({ userId, productId, productName, price, quantity, size });
    await cartItem.save();
    res.status(201).send('Product added to cart');
  } catch (error) {
    res.status(400).send('Invalid token');
  }
});

app.get('/api/cart/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
    console.log(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
    // console.log(cartItems);
  }
});

app.put('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, size } = req.body;
  const userId = req.userId;

  try {
    const updatedItem = await Cart.findOneAndUpdate(
      { _id: id, userId },
      { quantity, size },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found or unauthorized' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item' });
  }
});
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.patch("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true } // Return the updated document
    );

    res.json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ error: "Unable to update cart item quantity" });
  }
});
app.post('/api/address', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const newAddress = new ShipDetails({ ...req.body, userId });
    await newAddress.save();
    res.status(201).send(newAddress);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/address/', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send({ message: 'User ID is required' });
  }

  try {
    const shipDetails = await ShipDetails.find({ userId });
    if (!shipDetails) {
      return res.status(404).send({ message: 'No addresses found for this user' });
    }
    res.status(200).json(shipDetails);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

app.post('/api/orderhistory', async (req, res) => {
  try {
    const { userId, products, addressId, finalPrice, paymentMethod } = req.body;

    // Fetch address details based on addressId
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    const order = new OrderHistory({
      userId,
      products,
      addressId,
      finalPrice,
      paymentMethod
    });

    await order.save();
    res.status(201).json({ message: 'Order saved successfully', order });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
