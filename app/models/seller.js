// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SellerSchema   = new Schema({
    name:{ type:String ,required:true}
});

module.exports = mongoose.model('Seller', SellerSchema,'sellers');

