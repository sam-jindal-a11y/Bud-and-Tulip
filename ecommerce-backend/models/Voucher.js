// models/Voucher.js
import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    maxPerUse: {
        type: Number,
        required: true,
    },
    couponType: {
        type: String,
        required: true,
        enum: ['razorpay', 'all'], // Ensures only 'prepaid' or 'all' are valid
        default: 'all' // Default value if none is provided
    },
});

const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;
