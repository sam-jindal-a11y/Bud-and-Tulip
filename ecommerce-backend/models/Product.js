import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: [String], // Array of strings
        required: true
    },
    image: {
        type: [String], // Array of strings
        required: true
    },
    size: {
        type: [String], // Array of strings
        required: true
    },
    color: {
        type: [String], // Array of strings
        required: true
    },
    inbox: {
        type: String
    },
    washingInstruction: {
        type: String
    },
    hasOffer: {
        type: Boolean,
        required: true,
        default: false
    },
    offerPrice: {
        type: Number,
        // offerPrice is required if hasOffer is true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    originalPrice: {
        type: Number,
        default: null,
    },
    originalHasOffer: {
        type: Boolean,
        default: false,
    },
    salesCount: {
        type: Number,
        default: 0 // Initialize sales count to 0
    }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
