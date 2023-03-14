var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var attendanceSchema = new mongoose.Schema({  
  user_id:  String,
  date : String, 
  check_in_time : String,
  check_in_datetime : String,
  check_out_time : String,
  check_out_datetime : String,

  delete_status : Boolean,
});
attendanceSchema.plugin(timestamps);
mongoose.model('attendance', attendanceSchema);
module.exports = mongoose.model('attendance');