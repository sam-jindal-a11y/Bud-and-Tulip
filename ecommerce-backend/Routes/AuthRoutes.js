import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Signup Route
// Signup Route
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the current date as the account creation date
        const newUser = new User({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            createdAt: new Date() 
        });
        const savedUser = await newUser.save();

        // Generate token
        const token = jwt.sign({ id: savedUser._id }, 'shhhh', { expiresIn: '2h' });

        // Send response
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                createdAt: savedUser.createdAt, // Include account creation date
                token,
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});


// Login Route
// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if email is provided
        if (!email) {
            return res.status(400).send("Email is required");
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Handle guest login if password is not provided
        if (!password) {
            if (user.accountType !== 'guest') {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign({ id: user._id }, 'shhhh', { expiresIn: '1h' });

            // Send response
            return res.json({
                message: 'Guest login successful',
                user: {
                    id: user._id,
                    email: user.email,
                    accountType: user.accountType,
                    token,
                }
            });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = jwt.sign({ id: user._id }, 'shhhh', { expiresIn: '1h' });

        // Send response
        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
                lastLogin: user.lastLogin // Include the last login time in the response
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});


// Guest Signup Route
// Guest Signup Route
router.post('/guest-signup', async (req, res) => {
    const { email } = req.body;
    try {
        // Check if email is provided
        if (!email) {
            return res.status(400).send("Email is required");
        }

        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            // If the user exists and account type is 'guest', log them in
            if (user.accountType === 'guest') {
                // Update the lastLogin field
                user.lastLogin = new Date();
                await user.save();

                // Generate token
                const token = jwt.sign({ id: user._id }, 'shhhh', { expiresIn: '1h' });

                // Send response
                return res.status(200).json({
                    message: 'Guest user logged in successfully',
                    user: {
                        id: user._id,
                        email: user.email,
                        accountType: user.accountType,
                        createdAt: user.createdAt,
                        lastLogin: user.lastLogin,
                        token,
                    }
                });
            } else {
                return res.status(400).json({ message: 'Email already exists with a different account type' });
            }
        }

        // Create a new guest user with the current date as the account creation date
        const newGuestUser = new User({
            email,
            accountType: 'guest',
            createdAt: new Date(),
            lastLogin: new Date() // Set lastLogin to current date
        });
        const savedGuestUser = await newGuestUser.save();

        // Generate token
        const token = jwt.sign({ id: savedGuestUser._id }, 'shhhh', { expiresIn: '1h' });

        // Send response
        res.status(201).json({
            message: 'Guest user created successfully',
            user: {
                id: savedGuestUser._id,
                email: savedGuestUser.email,
                accountType: savedGuestUser.accountType,
                createdAt: savedGuestUser.createdAt,
                lastLogin: savedGuestUser.lastLogin,
                token,
            }
        });
    } catch (error) {
        console.error('Error creating guest user:', error);
        res.status(500).json({ message: 'Error creating guest user', error });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Get User by ID Route
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

export default router;
