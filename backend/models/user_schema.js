const mongoose = require('mongoose');

let user_schema = mongoose.Schema({
    role: String,
    username: String,
    password: String
}, {collection: 'users'})

module.exports = mongoose.model('User', user_schema)