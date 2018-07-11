// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
    name:{ type:String ,required:true},
    department:{ type:String ,required:true},
    info:{ type:String }
});

module.exports = mongoose.model('Product', ProductSchema,'products');

