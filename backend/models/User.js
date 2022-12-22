const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
});

module.exports = mongoose.model('User', User);

