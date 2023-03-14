var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var chat_userSchema = new mongoose.Schema({   
  
  Company_name: String,
  Contact_number: String,
  Email_id : String,
  User_id : String,
  Phone : String,
  Password : String
  //Date: Date,

});

chat_userSchema.plugin(timestamps);

mongoose.model('chat_user', chat_userSchema);

module.exports = mongoose.model('chat_user');