import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import seedRouter from './Routes/SeedRoutes.js';
import authRouter from './Routes/AuthRoutes.js';
import Product from './models/Product.js';
import cors from "cors";
dotenv.config();

const app = express();

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

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
