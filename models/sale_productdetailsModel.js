var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var sale_categorySchema = new mongoose.Schema({   
  
  title  : String,
  Desc : String,
  type  : String,
  bread : String,
  gender : String,
  age : String,
  noofqty : String,
  price : String,
  country : String,
  state : String,
  city : String,
  pincode : String,
  person_name : String,
  contact_number  : String,
  whatsapp_number : String,
  calling_time_from : String,
  calling_time_to : String,
  delete_status : Boolean

});

sale_categorySchema.plugin(timestamps);
mongoose.model('sale_category', sale_categorySchema);
module.exports = mongoose.model('sale_category');