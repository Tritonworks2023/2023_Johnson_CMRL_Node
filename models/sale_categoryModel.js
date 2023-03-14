var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var sale_categorySchema = new mongoose.Schema({   
  
  sale_cat_name: String,
  sale_cat_img: String,
  sale_cat_visible: String,

});

sale_categorySchema.plugin(timestamps);
mongoose.model('sale_category', sale_categorySchema);
module.exports = mongoose.model('sale_category');