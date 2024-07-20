import express from 'express';
import upload from '../middleware/upload.js';
import imagekit from '../config/imageKit.js';
import Image from '../models/imageSchema.js';

const router = express.Router();

// Upload route
router.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // Get the current images and their indices
    const existingImages = await Image.find().sort({ index: 1 });
    const existingIndexes = existingImages.map(img => img.index);

    // Find the next available index
    const nextAvailableIndex = existingIndexes.length < 5
      ? existingIndexes.length // If there are less than 5 images, the next index is the length of existing indexes
      : -1; // No more indices available

    if (nextAvailableIndex === -1) {
      return res.status(400).send('Maximum number of images reached.');
    }

    const uploadPromises = files.map(async (file, index) => {
      if (nextAvailableIndex + index >= 5) {
        throw new Error('No available index for additional images.');
      }

      const response = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
      });

      // Save to MongoDB with the incremental index
      const image = new Image({
        url: response.url,
        index: nextAvailableIndex + index
      });
      await image.save();

      return response;
    });

    const uploadResponses = await Promise.all(uploadPromises);

    res.status(200).json(uploadResponses);
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).send('Error uploading images.');
  }
});

// Get all banners
router.get('/banners', async (req, res) => {
  try {
    const banners = await Image.find().sort({ index: 1 });
    res.status(200).json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).send('Error fetching banners.');
  }
});

// Delete a banner by ID
router.delete('/banners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Image.findByIdAndDelete(id);
    // Update the indices of remaining images
    const images = await Image.find().sort({ index: 1 });
    for (let i = 0; i < images.length; i++) {
      images[i].index = i;
      await images[i].save();
    }
    res.status(200).send('Banner deleted successfully.');
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).send('Error deleting banner.');
  }
});

export default router;
