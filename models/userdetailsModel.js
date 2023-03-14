var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var userdetailsSchema = new mongoose.Schema({ 
  admin :Boolean,
  username:  String,
  password : String,
  user_email : String,
  user_email_verification : Boolean,
  user_phone : String,
  employee_id : Number,
  date_of_reg : String,
  profile_img : String,
  user_type : Number,
  user_status : String,
  fb_token : String,
  device_id : String,
  device_type : String,
  mobile_type : String,
  delete_status : Boolean,
  token:String
});
userdetailsSchema.plugin(timestamps);
mongoose.model('userdetails', userdetailsSchema);
module.exports = mongoose.model('userdetails');
