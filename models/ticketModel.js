var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var ticketSchema = new mongoose.Schema({  
  date_of_create :  String,
  station_id : String,
  station_detail : {  
       type: Schema.Types.ObjectId,
       ref: 'station_name',
      }, 
  esc_id : String,
  job_id : String,
  job_detail : {  
       type: Schema.Types.ObjectId,
       ref: 'job_no',
      },
  break_down_time : String,
  restored_time : String,
  down_time : String,
  break_down_reported_by : String,
  break_down_reported_by_first : String,
  break_down_observed : String,
  cause_for_breakdown : String,
  fault_type : String,
  ticket_no : String,
  action_taken : String,
  action_taken_by : String,
  verified_by : String,
  delete_status : Boolean,
  status : String,
  type : String,
  create_date_time :  Date,
  image_list : Array,
  phase:String
});
ticketSchema.plugin(timestamps);
mongoose.model('ticket', ticketSchema);
module.exports = mongoose.model('ticket');