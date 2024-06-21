import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import seedRouter from './Routes/SeedRoutes.js';
import authRouter from './Routes/AuthRoutes.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';

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

app.get('/api/cart', async (req, res) => {
  const userId = req.userId;

  try {
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items' });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
