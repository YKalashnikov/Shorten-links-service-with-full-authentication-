const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link'
    }]
})

module.exports = mongoose.model('User', UserSchema)