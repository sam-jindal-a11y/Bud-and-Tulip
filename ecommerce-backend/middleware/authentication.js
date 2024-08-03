import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

const router = express.Router();

// Authentication route
router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminUser = await AdminUser.findOne({ username });
    if (!adminUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      adminUser: {
        id: adminUser.id,
      },
    };

    jwt.sign(
      payload,
      'shhh',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create new admin user route
router.post('/create', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin user already exists
    const existingAdminUser = await AdminUser.findOne({ username });
    if (existingAdminUser) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin user
    const newAdminUser = new AdminUser({
      username,
      password: hashedPassword,
    });

    await newAdminUser.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
