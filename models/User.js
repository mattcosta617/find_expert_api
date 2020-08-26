const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
      },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },  
    createdAt: {
        type: Date,
        default: Date.now,
      }
});


User = mongoose.model('User', UserSchema);
module.exports = User;