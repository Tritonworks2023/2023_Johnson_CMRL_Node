var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var fault_typeSchema = new mongoose.Schema({  
  fault_type:  String,
  type : String,
  delete_status : Boolean,
});
fault_typeSchema.plugin(timestamps);
mongoose.model('fault_type', fault_typeSchema);
module.exports = mongoose.model('fault_type');
