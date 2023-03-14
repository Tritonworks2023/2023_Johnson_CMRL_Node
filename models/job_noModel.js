var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var job_noSchema = new mongoose.Schema({  
  station_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'station_name',
      },
  job_no : String,
  created_date : Date,
  unique_id : String,
  serving_level : String,
  delete_status : Boolean,
});
job_noSchema.plugin(timestamps);
mongoose.model('job_no', job_noSchema);
module.exports = mongoose.model('job_no');