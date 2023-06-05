var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var tickethistorySchema = new mongoose.Schema({  
  ticket_no:  String,
  ticket_status : String, 
  ticket_comments : String,
  ticket_photo : Array,
  user_id : {  
       type: Schema.Types.ObjectId,
       ref: 'userdetails',
      },
  date_of_create : String,
  delete_status : Boolean,

  part_no_req : String,
  part_det : Array,
 phase:String

});
tickethistorySchema.plugin(timestamps);
mongoose.model('tickethistory', tickethistorySchema);
module.exports = mongoose.model('tickethistory');