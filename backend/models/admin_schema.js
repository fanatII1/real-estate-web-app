const mongoose = require('mongoose');

let admin_schmema = mongoose.Schema({
    role: String,
    uesrname: String,
    password: String
}, {collection: 'admins'})

module.exports = mongoose.model('Admin', admin_schmema)