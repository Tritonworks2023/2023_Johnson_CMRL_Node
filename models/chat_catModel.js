var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var chat_catSchema = new mongoose.Schema({   
  
  Cat_Name: String,
  User_id: String,
  //Date: Date,

});

chat_catSchema.plugin(timestamps);

mongoose.model('chat_cat', chat_catSchema);

module.exports = mongoose.model('chat_cat');