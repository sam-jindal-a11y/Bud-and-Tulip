import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  color_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
});

const Color = mongoose.model('Color', colorSchema);

export default Color;
