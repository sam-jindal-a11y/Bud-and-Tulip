import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    usedVouchers: [{
        voucherId: mongoose.Schema.Types.ObjectId,
        usageCount: {
            type: Number,
            default: 0,
        },
    }, ],
});

const User = mongoose.model('User', userSchema);

export default User;