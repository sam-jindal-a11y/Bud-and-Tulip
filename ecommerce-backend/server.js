import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import seedRouter from './Routes/SeedRoutes.js';
import authRouter from './Routes/AuthRoutes.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use(cors());
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://harshil:harsh@cluster0.cbh4pcf.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use("/api/seed", seedRouter);
app.use("/api/auth", authRouter);
// Basic route
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
    const { productId, productName, price, quantity, size } = req.body;
    
    if (!productId || !productName || !price || !quantity || !size) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newCartItem = new Cart({ productId, productName, price, quantity, size });
      await newCartItem.save();
      res.status(201).json(newCartItem);
    } catch (error) {
      console.error("Error saving cart item:", error);
      res.status(500).json({ message: 'Failed to add item to cart' });
    }
  });
  app.get('/api/cart', async (req, res) => {
    try {
      const cartItems = await Cart.find();
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch cart items' });
    }
  });
  
  app.put('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity, size } = req.body;
    try {
      const updatedItem = await Cart.findByIdAndUpdate(id, { quantity, size }, { new: true });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update item' });
    }
  });


// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
