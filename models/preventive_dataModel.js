


var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var preventive_dataSchema = new mongoose.Schema({  

month : String,
type : String,
location : String,
escalatorId : String,
jobNo : String,
reportno : String,
plannedDate : String,
completedDate : String,
componentsReplaced : String,
partsDescription  : String,
replacement_date : String,
qty : String,
remarks : String,
date_of_create : String,
date_of_update : String,
delete_status : Boolean,


});
preventive_dataSchema.plugin(timestamps);
mongoose.model('preventive_data', preventive_dataSchema);
module.exports = mongoose.model('preventive_data');




