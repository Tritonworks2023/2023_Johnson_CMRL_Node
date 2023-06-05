var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var part_noSchema = new mongoose.Schema({  
  part_type :  String,
  part_no : String, 
  part_name : String, 
  delete_status : Boolean,
  phase:String
});
part_noSchema.plugin(timestamps);
mongoose.model('part_no', part_noSchema);
module.exports = mongoose.model('part_no');