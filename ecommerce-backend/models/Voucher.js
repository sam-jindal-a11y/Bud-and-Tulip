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
});

const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;