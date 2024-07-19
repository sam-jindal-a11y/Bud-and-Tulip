import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: function () {
            return this.accountType === 'user';
        }
    },
    lastName: {
        type: String,
        required: function () {
            return this.accountType === 'user';
        }
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: function () {
            return this.accountType === 'user';
        }
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
    }],
    lastLogin: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    accountType: {
        type: String,
        enum: ['guest', 'user'],
        required: true,
        default: 'user' // Default value is 'user'
    }
});

const User = mongoose.model('User', userSchema);

export default User;
