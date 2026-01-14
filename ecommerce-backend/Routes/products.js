// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const slugify = require('slugify');
const Product = require("../models/Product");

//generateUniqueSlug
async function generateUniqueSlug(name) {
  const baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (await Product.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}


// Create a product
router.post('/',upload.array("image", 6), async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        // const slug = slugify(name, {
        //     lower: true,
        //     strict: true
        // });
        const slug = await generateUniqueSlug(name);
        const newProduct = new Product({
            name,
            slug,
            description,
            price,
            stock
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//get product by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.name = name;
         product.slug = slugify(name, { lower: true, strict: true });
        product.description = description;
        product.price = price;
        product.stock = stock;

        product = await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
