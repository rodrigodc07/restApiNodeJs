// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name:{ type:String ,required:true}
    department:{ type:String ,required:true}
    info:{ type:String ,required:true}
});

module.exports = mongoose.model('Bear', BearSchema,'products');

