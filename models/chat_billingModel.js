var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var chat_billingSchema = new mongoose.Schema({   
  Bill_No : String,
  Cash_type : String,
  User_Number: String,
  User_Name: String,
  Grand_total : Number,
  Item_Details: Array,
  billing_time : String
});

chat_billingSchema.plugin(timestamps);

mongoose.model('chat_billing', chat_billingSchema);

module.exports = mongoose.model('chat_billing');