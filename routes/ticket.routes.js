var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ticketModel = require('./../models/ticketModel');
var tickethistoryModel = require('./../models/tickethistoryModel');
var request = require("request");
var job_noModel = require('./../models/job_noModel');



router.post('/create1', async function(req, res) {
  try{
        await ticketModel.create({
  date_of_create :  req.body.date_of_create,
  station_id : req.body.station_id,
  esc_id : req.body.esc_id,
  job_no : req.body.job_no,
  break_down_time : req.body.break_down_time,
  restored_time : req.body.restored_time,
  down_time : req.body.down_time,
  break_down_reported_by : req.body.break_down_reported_by,
  break_down_reported_by_first : req.body.break_down_reported_by_first,
  break_down_observed : req.body.break_down_observed || "",
  cause_for_breakdown : req.body.cause_for_breakdown || "",
  action_taken : req.body.action_taken || "",
  action_taken_by : req.body.action_taken_by || "",
  verified_by : req.body.verified_by,
  delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});




// router.post('/create', async function(req, res) {
//   console.log(req.body);
//   var ticket_no_temp = await ticketModel.find({}).count();
//   ticket_no_temp = +ticket_no_temp + 1;
//   var ticket_no = "TIC-"+ticket_no_temp;
//   try{
//   await ticketModel.create({
//   ticket_no : ticket_no,
//   date_of_create :  req.body.date_of_create,
//   station_id : req.body.station_id,
//   station_detail : req.body.station_id,
//   esc_id : req.body.esc_id || 0,
//   job_id : req.body.job_id,
//   job_detail : req.body.job_id,
//   break_down_time : req.body.date_of_create,
//   restored_time :  "",
//   down_time : "",
//   break_down_reported_by : req.body.break_down_reported_by,
//   break_down_reported_by_first : "",
//   break_down_observed : req.body.break_down_observed,
//   cause_for_breakdown : req.body.cause_for_breakdown,
//   action_taken : "",
//   action_taken_by : "",
//   verified_by : "",
//   status : "Open",
//   type  : req.body.type,
//   image_list : req.body.image_list,
//   delete_status : false,
//   fault_type : req.body.fault_type,
//         },async function (err, user) {
//           console.log(user)
//           try{
//   await tickethistoryModel.create({
//   ticket_no:  ticket_no,
//   ticket_status :  "Open",
//   ticket_comments :  req.body.break_down_observed,
//   ticket_photo :  req.body.image_list,
//   user_id :  req.body.break_down_reported_by,
//   date_of_create :  req.body.date_of_create,
//   delete_status : false
//         }, 
//         function (err, userdetails) {
//           console.log(err);
//           console.log(userdetails);
// var params = {
//             "user_type" : "1",
//             "notify_title" : "New Breakdown",
//             "notify_descri" : "You have an appointment",
//             "notify_img" : "",
//             "notify_time" : "",
//             "date_and_time" : "",
//             "user_id" : "",
//             "data_type" : {
//             "usertype":"4",
//             "type":""
//              }
// }

// request.post(
//     'http://54.215.252.172:3000/api/notification/send_notifiation',
//     { json: params },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//         }
//     }
// );
//         res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
//         });
// }
// catch(e){
//       res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
// }
//         }).populate('break_down_reported_by job_id');
// }
// catch(e){
//       res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
// }
// });





router.post('/create', async function(req, res) {
  console.log(req.body);
  var ticket_no_temp = await ticketModel.find({}).count();
  var job_details = await job_noModel.findOne({_id : req.body.job_id});
  console.log(job_details);

  let create_date1 = req.body.date_of_create.split(" ");
  let create_date2 = create_date1[0].split("-");
  let final_out = create_date2[2]+"-"+create_date2[1]+"-"+create_date2[0]+"T14:48:45.238Z";
  console.log(final_out);

  ticket_no_temp = +ticket_no_temp + 1;
  var ticket_no = "TIC-"+ticket_no_temp;
  try{
  await ticketModel.create({
  ticket_no : ticket_no,
  date_of_create :  req.body.date_of_create,
  station_id : req.body.station_id,
  station_detail : req.body.station_id,
  esc_id : req.body.esc_id || 0,
  job_id : req.body.job_id,
  job_detail : req.body.job_id,
  break_down_time : req.body.date_of_create,
  restored_time :  "",
  down_time : "",
  break_down_reported_by : req.body.break_down_reported_by,
  break_down_reported_by_first : "",
  break_down_observed : req.body.break_down_observed,
  cause_for_breakdown : req.body.cause_for_breakdown,
  action_taken : "",
  action_taken_by : "",
  verified_by : "",
  status : "Open",
  type  : req.body.type,
  create_date_time : final_out,
  image_list : req.body.image_list,
  delete_status : false,
  fault_type : req.body.fault_type,
        },async function (err, user) {
          console.log(user)
          try{
  await tickethistoryModel.create({
  ticket_no:  ticket_no,
  ticket_status :  "Open",
  ticket_comments :  req.body.break_down_observed,
  ticket_photo :  req.body.image_list,
  user_id :  req.body.break_down_reported_by,
  date_of_create :  req.body.date_of_create,
  delete_status : false
        }, 
        function (err, userdetails) {
          console.log(err)


/////Notificaion call start////////
          var params = {
            "notify_title" : "New Breakdown - "+ ticket_no,
            "notify_descri" : job_details.job_no +  " " +req.body.fault_type,
            "notify_img" : "",
            "notify_time" : "",
            "date_and_time" : req.body.date_of_create,
            "data_type" : {
            "usertype":"4",
            "type":""
             }
}

request.post(
    'http://cmrl.johnsonliftsltd.net:3000/api/notification/send_notifiation',
    { json: params },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
        }
    }
);
/////Notificaion call stop////////


        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


// router.get('/deletes', function (req, res) {
//       ticketModel.remove({}, function (err, user) {
//           if (err) return res.status(500).send("There was a problem deleting the user.");
//              res.json({Status:"Success",Message:"ticketModel Deleted", Data : {} ,Code:200});     
//       });
// });






router.post('/getlist_by_type',async function (req, res) {
  console.log(req.body);
  var temp_data = await ticketModel.find({type:req.body.type,break_down_reported_by:req.body.break_down_reported_by,status:req.body.status}).populate('station_detail job_detail');
  check_station(temp_data);
  function check_station(temp_data){
    if(req.body.station_id == ""){
      check_job(temp_data);
    }else{
      let temp = [];
      if(temp_data.length == 0){
         temp = temp_data
         check_job(temp);
      } else{
      for(let a = 0 ; a < temp_data.length ; a ++){
        if(temp_data[a].station_id == req.body.station_id){
          temp.push(temp_data[a]);
        }
        if(a == temp_data.length - 1){
          check_job(temp);
        }
      }
      }
    }
  }
  function check_job(station_filter){
   if(req.body.job_id == ""){
      finaldata(station_filter);
    }else{

      let temp = [];
      temp = station_filter
      if(station_filter.length == 0){
         temp = station_filter
         finaldata(temp);
      } else{
      for(let a = 0 ; a < temp_data.length ; a ++){
        if(temp_data[a].job_id == req.body.job_id){
          temp.push(temp_data[a]);
        }
        if(a == temp_data.length - 1){
          finaldata(temp);
        }
      }
      }
    }
  }
  function finaldata(datas){
    res.json({Status:"Success",Message:"Ticket List", Data : datas ,Code:200});
  }
  // if(req.body.station_id == ""){
  // }
  // if(req.body.station_id == ""){
  //       ticketModel.find({type:req.body.type,break_down_reported_by:req.body.break_down_reported_by,status:req.body.status}, function (err, StateList) {
  //         res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
  //       }).populate("station_detail job_detail");
  // }else{
  //   console.log("Fiter by station");
  //       ticketModel.find({type:req.body.type,break_down_reported_by:req.body.break_down_reported_by,station_id:req.body.station_id,status:req.body.status}, function (err, StateList) {
  //         res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
  //       }).populate("station_detail job_detail");
  // }
});



router.post('/cmrl_dashboard_count',async function (req, res) {
 
 console.log(req.body);
  var open_count = await ticketModel.find({status:"Open",type  : req.body.type}).count();
  var inprogress_count = await ticketModel.find({status:"Inprogress",type  : req.body.type}).count();
  var pending_count = await ticketModel.find({status:"Pending",type  : req.body.type}).count();
  var completed_count = await ticketModel.find({status:"Completed",type  : req.body.type}).count();
  var close_count = await ticketModel.find({status:"Close",type  : req.body.type}).count();
let a = {
    open_count : open_count,
    inprogress_count : inprogress_count,
    pending_count : pending_count,
    completed_count : completed_count,
    close_count : close_count,
}
 res.json({Status:"Success",Message:"Ticket List", Data : a ,Code:200});
});






router.post('/johnson_dashboard_count',async function (req, res) {
   console.log(req.body);
  var open_count = await ticketModel.find({status:"Open",type  : req.body.type}).count();
  var inprogress_count = await ticketModel.find({status:"Inprogress",type  : req.body.type}).count();
  var pending_count = await ticketModel.find({status:"Pending",type  : req.body.type}).count();
  var completed_count = await ticketModel.find({status:"Completed",type  : req.body.type}).count();
  var close_count = await ticketModel.find({status:"Close",type  : req.body.type}).count();
let a = {
    open_count : open_count,
    inprogress_count : inprogress_count,
    pending_count : pending_count,
    completed_count : completed_count,
    close_count : close_count,
}
 res.json({Status:"Success",Message:"Ticket List", Data : a ,Code:200});
});





router.post('/johnson_getlist_by_station', function (req, res) {
  console.log(req.body);
  if(req.body.station_id == "" && req.body.job_id == ""){
        ticketModel.find({type:req.body.type,status:req.body.status}, function (err, StateList) {
            console.log(StateList.length);
          res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
        }).populate("station_detail job_detail");
  }else if(req.body.station_id !== "" && req.body.job_id == ""){
        ticketModel.find({type:req.body.type,station_id:req.body.station_id,status:req.body.status}, function (err, StateList) {
           console.log(StateList.length);
          res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
        }).populate("station_detail job_detail");
  }else if(req.body.station_id == "" && req.body.job_id !== ""){
        ticketModel.find({type:req.body.type,job_id : req.body.job_id,status:req.body.status}, function (err, StateList) {
           console.log(StateList.length);
          res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
        }).populate("station_detail job_detail");
  }
  else if(req.body.station_id !== "" && req.body.job_id !== ""){
        ticketModel.find({type:req.body.type,station_id:req.body.station_id,job_id : req.body.job_id,status:req.body.status}, function (err, StateList) {
           console.log(StateList.length);
          res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
        }).populate("station_detail job_detail");
  }
});


router.post('/johnson_getlist_by_jobno', function (req, res) {
  if(req.body.jobno == ""){
        ticketModel.find({type:req.body.type}, function (err, StateList) {
          res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
        });
  }else{
        ticketModel.find({type:req.body.type,job_no : req.body.job_no}, function (err, StateList) {
          res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
        });
  }
});


// router.post('/getlist_by_type', function (req, res) {
//   if(req.body.station_id == ""){
//         ticketModel.find({type:req.body.type,break_down_reported_by : req.body.break_down_reported_by}, function (err, StateList) {
//           res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
//         });
//   }else{
//         ticketModel.find({type:req.body.type,station_id : req.body.station_id, break_down_reported_by : req.body.break_down_reported_by}, function (err, StateList) {
//           res.json({Status:"Success",Message:"Ticket List", Data : StateList ,Code:200});
//         });
//   }
// });


router.get('/getlist', function (req, res) {
        ticketModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Activity Details", Data : Functiondetails ,Code:200});
        });
});



router.get('/change_time', function (req, res) {
        ticketModel.find({}, function (err, Functiondetails) {
          console.log(Functiondetails[0]);
          for(let a = 0 ; a < Functiondetails.length ; a++){
          let create_date1 = Functiondetails[a].date_of_create.split(" ");
          let create_date2 = create_date1[0].split("-");
          let final_out = create_date2[2]+"-"+create_date2[1]+"-"+create_date2[0]+"T14:48:45.238Z";
          console.log(final_out);
             let c = {
             create_date_time : final_out,
             }
             console.log(c);
             console.log(Functiondetails[a]._id);
            ticketModel.findByIdAndUpdate(Functiondetails[a]._id, c, {new: true}, function (err, UpdatedDetails) {
            console.log(err);
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             // res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
           });
            if(a == Functiondetails.length - 1){
               // res.json({Status:"Success",Message:"Activity Details", Data : {} ,Code:200});
            }
           }

        });
});


router.post('/update',async function (req, res) {
  var ticket_detail = await ticketModel.findOne({ticket_no:req.body.ticket_no});
        ticketModel.findByIdAndUpdate(ticket_detail._id, req.body, {new: true}, function (err, UpdatedDetails) {
            console.log(err);
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Ticket Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        ticketModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            console.log(err);
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});




// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ticketModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
