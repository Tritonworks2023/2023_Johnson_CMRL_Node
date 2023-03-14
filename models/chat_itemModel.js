var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var chat_itemSchema = new mongoose.Schema({   
  
  item_Name: String,
  item_code : String,
  item_price: Number,
  cat_id : String,
  cat_name : String,
  User_id: String,
  //Date: Date,

});

chat_itemSchema.plugin(timestamps);

mongoose.model('chat_item', chat_itemSchema);

module.exports = mongoose.model('chat_item');