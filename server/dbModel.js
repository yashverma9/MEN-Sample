const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name : String,
    phNo : Number,
    email : String,
});

//This will create a collection sampleData based on testSchema
module.exports = mongoose.model('sampleData', testSchema); 