import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String, unique: true
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    resetToken: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user', 'premium']
    },
    fromGithub: {
        type: Boolean,
        default:false
    },
    cart: {
        _id: {
            type: mongoose.Types.ObjectId,
            ref: 'carts',
            default: null
        }
    }
});
usersSchema.pre('find', function (next) {
    this.populate('carts._id');
    next();
});

export const usersModel = mongoose.model('Users',usersSchema)