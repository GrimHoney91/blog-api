const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, minLength: 8, maxLength: 25, required: true},
    password: {type: String, minLength: 8, maxLength: 25, required: true},
    status: {type: String, enum: ['member', 'admin'], default: 'member', required: true}
});

module.exports = mongoose.model('User', UserSchema);