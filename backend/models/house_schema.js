const mongoose = require('mongoose');

//this schema will allow us to store specfic house info in the 'houses' collecction
let house_schema = mongoose.Schema({
    house: Object,
    image: {
        data: Buffer,
        ContentType: String
    }
}, {collection: 'houses'})

module.exports = mongoose.model('House', house_schema);