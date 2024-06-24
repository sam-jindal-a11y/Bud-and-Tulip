// models/ShipDetails.js
import mongoose from'mongoose';

const shipDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: String,
  address1: { type: String, required: true },
  address2: String,
  city: { type: String, required: true },
  country: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  defaultAddress: { type: Boolean, default: false }
});

const ShipDetails = mongoose.model('ShipDetails', shipDetailsSchema);

export default ShipDetails;
