// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StockSchema   = new Schema({
    productId:{ type:String ,required:true}
    quantityAvailable:{ type:String ,required:true}
    quantityReserved:{ type:String ,required:true}
    storeId:{ type:String ,required:true}
});

module.exports = mongoose.model('Stock', StockSchema,'estoque');

