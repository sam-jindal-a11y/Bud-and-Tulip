import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
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
import Voucher from './models/Voucher.js';
import User from './models/User.js';
import Sale from './models/Sale.js';
import uploadRoutes from './Routes/upload.js';
import multer from 'multer';
import ImageKit from 'imagekit';
import Razorpay from 'razorpay';
// import 'dotenv/config';
import dotenv from 'dotenv';
// import { config } from 'dotenv';
// import imageKit from './config/imageKit.js';
dotenv.config();



const imagekit = new ImageKit({
  publicKey: 'public_LLDWv3bptPXBwBtpULs2IVv4L14=',
  privateKey: 'private_sS04v5+phSLOVJdXy2nYnzMm500=',
  urlEndpoint: 'https://ik.imagekit.io/zfayt6inj'
});



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// config({path:"./config/config.env"})

// Static files
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/upload', uploadRoutes);
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


// Multer configuration (not used for storage, just for handling file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
app.post('/api/products', upload.array('image', 6), async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    size,
    color,
    inbox,
    washingInstruction,
    hasOffer,
    offerPrice,
    isActive,
  } = req.body;

  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send({ error: 'Please upload at least one image.' });
  }

  try {
    const imageUploadPromises = files.map(file => {
      return imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
      });
    });

    const imageResponses = await Promise.all(imageUploadPromises);
    const imageUrls = imageResponses.map(response => response.url);

    // Here you can save the product details along with imageUrls to your database
    // For demonstration, we are returning the details as the response

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      size,
      color,
      inbox,
      washingInstruction,
      hasOffer,
      offerPrice,
      isActive,
      image: imageUrls,
    });

    // Save product to database logic here...
    const savedProduct = await newProduct.save();
    console.log("uploaded");

    res.status(201).send({ message: 'Product created successfully', data: savedProduct });
  } catch (error) {
    console.error('Error uploading images to ImageKit:', error);
    res.status(500).send({ error: 'Error uploading images' });
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
  const {
    id
  } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      message: 'Server error, could not update product'
    });
  }
});

app.post('/products/by-categories', async (req, res) => {
  const { categoryNames } = req.body;

  if (!categoryNames || !Array.isArray(categoryNames)) {
    return res.status(400).json({ error: 'Invalid category names' });
  }
  console.log(categoryNames);
  try {
    const products = await Product.find({ category: { $in: categoryNames } }); // Assuming categoryName is stored in Product model
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
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

app.post('/sales', async (req, res) => {
  const {
    saleName,
    startDate,
    startTime,
    endDate,
    endTime,
    discount,
    flatDiscount,
    categories,
    products,
  } = req.body;

  try {
    // Create a new sale
    const newSale = new Sale({
      saleName,
      startDate,
      startTime,
      endDate,
      endTime,
      discount,
      flatDiscount,
      categories,
    });

    await newSale.save();

    const updatePromises = products.map(product => 
      Product.findByIdAndUpdate(product._id, {
        originalPrice: product.price,
        originalHasOffer: product.hasOffer,
        offerPrice: product.offerPrice,
        hasOffer: product.hasOffer,
      }, { new: true })
    );

    await Promise.all(updatePromises);

    // Schedule a task to revert products to their original state after the sale ends
    const saleEndTime = new Date(`${endDate}T${endTime}`);
    setTimeout(async () => {
      const revertPromises = products.map(product =>
        Product.findByIdAndUpdate(product._id, {
          offerPrice: product.originalPrice,
          hasOffer: product.originalHasOffer,
        }, { new: true })
      );
      await Promise.all(revertPromises);
    }, saleEndTime - Date.now());

    res.status(201).json(newSale);
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET all sales
app.get('/sales', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    console.error('Error fetching sales:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});
const oneWeekBefore = (date) => {
  const result = new Date(date);
  result.setDate(result.getDate() - 7);
  return result;
};

app.get('/upcoming-sales', async (req, res) => {
  try {
    const today = new Date();
    const upcomingSales = await Sale.find({
      startDate: { $gte: today, $lte: oneWeekBefore(today) },
    });

    res.json(upcomingSales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE a sale by ID
app.delete('/sales/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await Sale.findByIdAndDelete(id);
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json({ message: 'Sale deleted successfully' });
  } catch (err) {
    console.error('Error deleting sale:', err);
    res.status(500).json({ message: 'Server Error' });
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
app.delete('/api/address/:id', async (req, res) => {
  try {
    
    const addressId = req.params.id;

    // Ensure that the address belongs to the current user before deleting
    const addressToDelete = await ShipDetails.findOneAndDelete({ _id: addressId });

    if (!addressToDelete) {
      return res.status(404).send({ error: 'Address not found or unauthorized' });
    }

    res.status(200).send({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update API
app.put('/api/address/:id', async (req, res) => {
  try {
    const addressId = req.params.id;

    const address = await ShipDetails.findOneAndUpdate(
      { _id: addressId },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).send({ error: 'Address not found' });
    }

    res.status(200).send(address);
  } catch (error) {
    res.status(400).send({ error: error.message });
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
    const {
      id
    } = req.params;
    const {
      name
    } = req.body; // Assuming you're updating only the name field

    const updatedSize = await Size.findOneAndUpdate({
        size_id: id
      }, {
        name
      }, {
        new: true
      } // To return the updated document
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
    const {
      name
    } = req.body;
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
    const {
      name
    } = req.body;
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
    const {
      id
    } = req.params;

    const deletedCategory = await Category.findOneAndDelete({
      category_id: id
    });

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
    const {
      id
    } = req.params;
    const {
      name
    } = req.body; // Assuming you're updating only the name field

    const updatedCategory = await Category.findOneAndUpdate({
        category_id: id
      }, {
        name
      }, {
        new: true
      } // To return the updated document
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
    const {
      id
    } = req.params;

    const deletedColor = await Color.findOneAndDelete({
      color_id: id
    });

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
    const {
      id
    } = req.params;
    const {
      name
    } = req.body; // Assuming you're updating only the name field

    const updatedColor = await Color.findOneAndUpdate({
        color_id: id
      }, {
        name
      }, {
        new: true
      } // To return the updated document
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
    const {
      userId,
      productId,
      productName,
      price,
      image
    } = req.body;

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
    res.status(500).send({
      message: error.message
    });
  }
});

// Get all wishlist items for a user
app.get("/api/wishlist/:userId", auth, async (req, res) => {
  const {
    userId
  } = req.params;

  try {
    // Find all wishlist items for the user
    const wishlistItems = await Wishlist.find({
      userId
    });

    res.status(200).send(wishlistItems);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
});

// Delete wishlist item
app.delete("/api/wishlist/:userId/:productId", auth, async (req, res) => {
  const {
    userId,
    productId
  } = req.params;

  try {
    // Find and delete the wishlist item
    const deletedItem = await Wishlist.findOneAndDelete({
      userId,
      productId
    });

    if (!deletedItem) {
      return res.status(404).send({
        message: "Wishlist item not found"
      });
    }

    res.status(200).send({
      message: "Wishlist item deleted successfully",
      deletedItem
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
});


// vouchers
app.post('/api/vouchers', async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.status(201).send(voucher);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/vouchers', async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.send(vouchers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/vouchers/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id);
    if (!voucher) {
      res.status(404).send('Voucher not found');
    } else {
      res.send(voucher);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/api/validate', async (req, res) => {
  const {
    code,
    userId
  } = req.body;
  try {
    const voucher = await Voucher.findOne({
      code
    });
    if (!voucher) {
      return res.status(404).json({
        message: 'Voucher not found'
      });
    }

    const currentDate = new Date();
    if (currentDate < voucher.startDate || currentDate > voucher.endDate) {
      return res.status(400).json({
        message: 'Voucher is not valid'
      });
    }

    const user = await User.findById(userId);
    if (user.usedVouchers.includes(voucher._id)) {
      return res.status(400).json({
        message: 'Voucher has already been used by this user'
      });
    }

    console.log(user); // Ensure this logs correctly
    return res.json(voucher);
  } catch (error) {
    console.error('Server error:', error); // Log the error
    return res.status(500).json({
      message: 'Server error'
    });
  }
});
app.post('/api/apply-voucher', async (req, res) => {
  const {
    code,
    userId
  } = req.body;
  try {
    const voucher = await Voucher.findOne({
      code
    });
    if (!voucher) {
      return res.status(404).json({
        message: 'Voucher not found'
      });
    }
    const currentDate = new Date();
    if (currentDate < voucher.startDate || currentDate > voucher.endDate) {
      return res.status(400).json({
        message: 'Voucher is not valid'
      });
    }
    const user = await User.findById(userId);
    const voucherUsage = user.usedVouchers.find(v => v.voucherId.equals(voucher._id));
    console.log(voucherUsage); // Ensure this logs correctly
    if (voucherUsage && voucherUsage.usageCount >= voucher.maxPerUse) {
      return res.status(400).json({
        message: 'Voucher usage limit exceeded for this user'
      });
    } else {
      // Update the usage count or add the voucher usage record
      if (voucherUsage) {
        voucherUsage.usageCount += 1;
      } else {
        user.usedVouchers.push({
          voucherId: voucher._id,
          usageCount: 1
        });
      }

      await user.save();

      // Continue with applying the voucher or other logic
    }

    return res.json({
      message: 'Voucher applied successfully',
      voucher
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error'
    });
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


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
app.post("/orders", async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: "Amount and currency are required" });
  }

  const options = {
    amount: amount * 100, // Amount is in the smallest currency unit
    currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch payment details
app.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch payment details");
  }
});
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));