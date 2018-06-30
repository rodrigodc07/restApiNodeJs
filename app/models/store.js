// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StoreSchema   = new Schema({
    name:{ type:String ,required:true},
    sellerName:{ type:String ,required:true},
    address:{ type:String ,required:true},
    stock:[String]
});

module.exports = mongoose.model('Store', StoreSchema,'lojas');

