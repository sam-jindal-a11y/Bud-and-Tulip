// models/imageSchema.js
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  index: { type: Number, required: true, min: 0, max: 4, unique: true }
});

const Image = mongoose.model('Image', imageSchema);
export default Image;
