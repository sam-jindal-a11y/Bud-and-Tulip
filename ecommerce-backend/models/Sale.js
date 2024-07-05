import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  saleName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: null,
  },
  flatDiscount: {
    type: Number,
    default: null,
  },
  categories: [
    {
      type: String,
      ref: 'Category',
    },
  ],
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      offerPrice: {
        type: Number,
        required: true,
      },
      hasOffer: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
