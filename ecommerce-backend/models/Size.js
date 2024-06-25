import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  size_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
});

const Size = mongoose.model('Size', sizeSchema);

export default Size;
