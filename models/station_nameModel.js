var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var station_nameSchema = new mongoose.Schema({  
  station_name:  String,
  type : String, 
  delete_status : Boolean,
});
station_nameSchema.plugin(timestamps);
mongoose.model('station_name', station_nameSchema);
module.exports = mongoose.model('station_name');