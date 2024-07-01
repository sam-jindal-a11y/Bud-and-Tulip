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
import Size from './models/Size.js';
import Color from './models/Color.js';
import Category from './models/Category.js';
import ShipDetails from './models/ShipDetails.js';
import Wishlist from './models/Wishlist.js';
import auth from './middleware/auth.js';
import orderHistoryRouter from './Routes/OrderHistory.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Static files
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Authentication middleware


// MongoDB connection
mongoose.connect('mongodb+srv://harshil:harsh@cluster0.cbh4pcf.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/api/seed', seedRouter);
app.use('/api/auth', authRouter);
app.use('/api/orderHistory', orderHistoryRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      createdProducts: products
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/api/products', async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    image,
    size,
    color,
    inbox,
    washingInstruction,
    hasOffer,
    offerPrice,
    isActive
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      image,
      size,
      color,
      inbox,
      washingInstruction,
      hasOffer,
      offerPrice,
      isActive
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    res.json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error, could not update product' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

app.post('/api/cart', async (req, res) => {
  console.log(req.body);
  const {
    userId,
    productId,
    productName,
    price,
    image,
    quantity,
    size
  } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, 'shhhh');
    console.log(decodedToken);
    if (decodedToken.id !== userId) {
      return res.status(403).send('Unauthorized');
    }
    const cartItem = new Cart({
      userId,
      productId,
      productName,
      price,
      image,
      quantity,
      size
    });
    await cartItem.save();
    res.status(201).send('Product added to cart');
  } catch (error) {
    res.status(400).send('Invalid token');
  }
});

app.get('/api/cart/', async (req, res) => {
  const {
    userId
  } = req.query;

  if (!userId) {
    return res.status(400).json({
      message: 'User ID is required'
    });
  }

  try {
    const cartItems = await Cart.find({
      userId
    });
    res.status(200).json(cartItems);
    console.log(cartItems);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching cart items',
      error
    });
    // console.log(cartItems);
  }
});

app.put('/api/cart/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const {
    quantity,
    size
  } = req.body;
  const userId = req.userId;

  try {
    const updatedItem = await Cart.findOneAndUpdate({
      _id: id,
      userId
    }, {
      quantity,
      size
    }, {
      new: true
    });
    if (!updatedItem) {
      return res.status(404).json({
        message: 'Item not found or unauthorized'
      });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update item'
    });
  }
});
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }
    res.status(200).json({
      message: "Cart item deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
app.patch("/api/cart/:id", async (req, res) => {
  const {
    id
  } = req.params;
  const {
    quantity
  } = req.body;

  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(
      id, {
        quantity
      }, {
        new: true
      } // Return the updated document
    );

    res.json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({
      error: "Unable to update cart item quantity"
    });
  }
});
app.post('/api/address', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const newAddress = new ShipDetails({
      ...req.body,
      userId
    });
    await newAddress.save();
    res.status(201).send(newAddress);
  } catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
});

app.get('/api/address/', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send({
      message: 'User ID is required'
    });
  }

  try {
    const shipDetails = await ShipDetails.find({
      userId
    });
    if (!shipDetails) {
      return res.status(404).send({
        message: 'No addresses found for this user'
      });
    }
    res.status(200).json(shipDetails);
  } catch (error) {
    res.status(500).send({
      message: 'Server error',
      error
    });
  }
});

app.post('/api/orderhistory', async (req, res) => {
  try {
    const {
      userId,
      products,
      addressId,
      finalPrice,
      paymentMethod
    } = req.body;

    // Fetch address details based on addressId
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({
        error: 'Address not found'
      });
    }

    const order = new OrderHistory({
      userId,
      products,
      addressId,
      finalPrice,
      paymentMethod
    });

    await order.save();
    res.status(201).json({
      message: 'Order saved successfully',
      order
    });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({
      error: 'Failed to save order'
    });
  }
});



// Get all sizes
app.get('/sizes', async (req, res) => {
  try {
    const sizes = await Size.find();
    res.json(sizes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving sizes');
  }
});

app.delete('/sizes/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const deletedSize = await Size.findOneAndDelete({
      size_id: id
    });


    if (!deletedSize) {
      return res.status(404).send('Size not found');
    }

    res.send(`Size with id ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting size');
  }
});

app.put('/sizes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body; // Assuming you're updating only the name field

    const updatedSize = await Size.findOneAndUpdate(
      { size_id: id },
      { name },
      { new: true } // To return the updated document
    );

    if (!updatedSize) {
      return res.status(404).send('Size not found');
    }

    res.json(updatedSize); // Return updated size object
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating size');
  }
});


// Add a new category
app.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    const count = await Category.countDocuments();
    const category = new Category({
      category_id: count + 1,
      name
    });
    await category.save();
    res.status(201).send('Category added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding category');
  }
});
// Add a new color
app.post('/colors', async (req, res) => {
  try {
    const { name } = req.body;
    const count = await Color.countDocuments();
    const color = new Color({
      color_id: count + 1,
      name
    });
    await color.save();
    res.status(201).send('Color added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding color');
  }
});


app.post('/sizes', async (req, res) => {
  try {
    const {
      name
    } = req.body;
    const count = await Size.countDocuments();
    const size = new Size({
      size_id: count + 1,
      name
    });
    await size.save();
    res.status(201).send('Size added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding size');
  }
});

// Retrieve all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving categories');
  }
});

// Delete a category by ID
app.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findOneAndDelete({ category_id: id });

    if (!deletedCategory) {
      return res.status(404).send('Category not found');
    }

    res.send(`Category with id ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting category');
  }
});

// Update a category by ID
app.put('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body; // Assuming you're updating only the name field

    const updatedCategory = await Category.findOneAndUpdate(
      { category_id: id },
      { name },
      { new: true } // To return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).send('Category not found');
    }

    res.json(updatedCategory); // Return updated category object
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating category');
  }
});


// Add a new color
// Retrieve all colors
app.get('/colors', async (req, res) => {
  try {
    const colors = await Color.find();
    res.json(colors);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving colors');
  }
});

// Delete a color by ID
app.delete('/colors/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedColor = await Color.findOneAndDelete({ color_id: id });

    if (!deletedColor) {
      return res.status(404).send('Color not found');
    }

    res.send(`Color with id ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting color');
  }
});

// Update a color by ID
app.put('/colors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body; // Assuming you're updating only the name field

    const updatedColor = await Color.findOneAndUpdate(
      { color_id: id },
      { name },
      { new: true } // To return the updated document
    );

    if (!updatedColor) {
      return res.status(404).send('Color not found');
    }

    res.json(updatedColor); // Return updated color object
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating color');
  }
});

// routes/wishlist.js



// Add to Wishlist
app.post("/api/wishlist", auth, async (req, res) => {
  try {
    const { userId, productId, productName, price, image } = req.body;

    const newWishlistItem = new Wishlist({
      userId,
      productId,
      productName,
      price,
      image,
    });

    await newWishlistItem.save();
    res.status(201).send("Product added to wishlist");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get all wishlist items for a user
app.get("/api/wishlist/:userId", auth, async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all wishlist items for the user
    const wishlistItems = await Wishlist.find({ userId });

    res.status(200).send(wishlistItems);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete wishlist item
app.delete("/api/wishlist/:userId/:productId", auth, async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find and delete the wishlist item
    const deletedItem = await Wishlist.findOneAndDelete({ userId, productId });

    if (!deletedItem) {
      return res.status(404).send({ message: "Wishlist item not found" });
    }

    res.status(200).send({ message: "Wishlist item deleted successfully", deletedItem });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});





app.get('/initialize', async (req, res) => {
  try {
    await Size.insertMany([{
        size_id: 1,
        name: 'Small'
      },
      {
        size_id: 2,
        name: 'Medium'
      },
      {
        size_id: 3,
        name: 'Large'
      }
    ]);

    await Category.insertMany([{
        category_id: 1,
        name: 'Clothing'
      },
      {
        category_id: 2,
        name: 'Electronics'
      }
    ]);

    await Color.insertMany([{
        color_id: 1,
        name: 'Red'
      },
      {
        color_id: 2,
        name: 'Blue'
      },
      {
        color_id: 3,
        name: 'Green'
      }
    ]);

    res.send('Initialized collections with sample data');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error initializing collections');
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));