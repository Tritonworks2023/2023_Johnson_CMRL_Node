var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var PhaseSchema = new mongoose.Schema({  
  phase:  String,
  delete_status : Boolean,
});
PhaseSchema.plugin(timestamps);
mongoose.model('phase', PhaseSchema);
module.exports = mongoose.model('phase');