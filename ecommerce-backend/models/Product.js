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
        type: Array,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    color: {
        type: Array,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;