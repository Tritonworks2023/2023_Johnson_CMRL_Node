var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var tickethistoryModel = require('./../models/tickethistoryModel');
var ticketModel = require('./../models/ticketModel');
var request = require("request");


router.post('/create', async function(req, res) {
    var ticket_detail = await ticketModel.findOne({ticket_no:req.body.ticket_no}).populate('job_detail');
    console.log(ticket_detail);
  try{
  await tickethistoryModel.create({
  ticket_no:  req.body.ticket_no,
  ticket_status :  req.body.ticket_status,
  ticket_comments :  req.body.ticket_comments,
  ticket_photo :  req.body.ticket_photo,
  user_id :  req.body.user_id,
  date_of_create :  req.body.date_of_create,
  delete_status : false,
  part_no_req : req.body.part_no_req || "No",
  part_det : req.body.part_det || [],
        }, 
        function (err, user) {
          console.log(user);
        var c = {
          status : req.body.ticket_status,
          restored_time : ''
        }
        if(req.body.ticket_status == 'Completed') {
          c.restored_time = req.body.date_of_create
        }
        console.log("************99999999999999999",c);
        ticketModel.findByIdAndUpdate(ticket_detail._id, c, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             // res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});

             /////Notificaion call start////////
          var params = {
            "notify_title" : "Update Breakdown - "+req.body.ticket_no + " " +req.body.ticket_status,
            "notify_descri" : ticket_detail.job_detail.job_no +  " " +req.body.ticket_status,
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
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/create_new', async function(req, res) {
  var ticket_detail = await ticketModel.findOne({ticket_no:req.body.ticket_no}).populate('job_detail');
  console.log(ticket_detail);
try{
await tickethistoryModel.create({
ticket_no:  req.body.ticket_no,
ticket_status :  req.body.ticket_status,
ticket_comments :  req.body.ticket_comments,
ticket_photo :  req.body.ticket_photo,
user_id :  req.body.user_id,
date_of_create :  req.body.date_of_create,
delete_status : false,
part_no_req : req.body.part_no_req || "No",
part_det : req.body.part_det || [],
phase:ticket_detail.phase
      }, 
      function (err, user) {
        console.log(user);
      var c = {
        status : req.body.ticket_status,
        restored_time : ''
      }
      if(req.body.ticket_status == 'Completed') {
        c.restored_time = req.body.date_of_create
      }
      console.log("************99999999999999999",c);
      ticketModel.findByIdAndUpdate(ticket_detail._id, c, {new: true}, function (err, UpdatedDetails) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           // res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});

           /////Notificaion call start////////
        var params = {
          "notify_title" : "Update Breakdown - "+req.body.ticket_no + " " +req.body.ticket_status,
          "notify_descri" : ticket_detail.job_detail.job_no +  " " +req.body.ticket_status,
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
      });
}
catch(e){
    res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/update', async function(req, res) {
    var ticket_detail = await ticketModel.findOne({ticket_no:req.body.ticket_no}).populate('job_detail');
  try{
  await tickethistoryModel.create({
  ticket_no:  req.body.ticket_no,
  ticket_status :  req.body.ticket_status,
  ticket_comments :  req.body.ticket_comments,
  ticket_photo :  req.body.ticket_photo,
  user_id :  req.body.user_id,
  date_of_create :  req.body.date_of_create,
  delete_status : false
        }, 
        function (err, user) {
          console.log(user);
        let c = {
          status : req.body.ticket_status,
          verified_by : req.body.user_id
          // restored_time : req.body.date_of_create
        }
        ticketModel.findByIdAndUpdate(ticket_detail._id, c, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             // res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
          /////Notificaion call start////////
          var params = {
            "notify_title" : "Closed Breakdown - "+ req.body.ticket_no + " " +req.body.ticket_status,
            "notify_descri" : ticket_detail.job_detail.job_no +  " " +req.body.ticket_status,
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
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});

router.post('/getlist_by_ticket_no', function (req, res) {
  // console.log("rew",req.body)
        tickethistoryModel.find({ticket_no:req.body.ticket_no}, function (err, StateList) {
        // console.log(StateList);
        for(let a  = 0; a < StateList.length; a++){
           StateList[a].part_no_req = '';
           if(StateList[a].ticket_status == 'Completed'){
                   StateList[a].part_det.forEach(elements => {
                   console.log( StateList[a].part_no_req,"part_values");
                   console.log(elements.part_name);
                   elements.part_name =  elements.part_name.replace("\n", "");
                     StateList[a].part_no_req =  StateList[a].part_no_req + ", " +elements.part_name;
                });
                   StateList[a].part_no_req = StateList[a].part_no_req.substring(1);
           }
          if(a == StateList.length  - 1){
            res.json({Status:"Success",Message:"Ticket History List", Data : StateList ,Code:200});
          }
        }
        }).populate("user_id");
});

router.get('/deletes', function (req, res) {
      tickethistoryModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"tickethistoryModel Deleted", Data : {} ,Code:200});     
      });
});

router.delete('/delete/:id', function (req, res) {
       console.log(req.params.id);
       tickethistoryModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Station Deleted Successfully", Data : {} ,Code:200});
      });
});

router.get('/getlist', function (req, res) {
        tickethistoryModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Station Details List", Data : Functiondetails ,Code:200});
        });
});


router.put('/update/:id', function (req, res) {
        tickethistoryModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Station Detail Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        tickethistoryModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      tickethistoryModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});



//getstationBasedTicketList
router.get('/getstationBasedTicketList',async function (req, res) {
 await ticketModel.find({delete_status : false}, function (err, Functiondetails) {
    res.json({Status:"Success",Message:"Station Details List", Data : Functiondetails ,Code:200});
  }).populate('station_detail job_detail');
});


//getSelectedTicketList
router.get('/getSelectedTicketList',async function (req, res) {
  // console.log("req.query.id}",req.query.id);
 await tickethistoryModel.find({  "ticket_no" : req.query.id,delete_status : false}, function (err, StateList) {
    res.json({Status:"Success",Message:"Ticket History List", Data : StateList ,Code:200});
    console.log("err",err)
  });

 });

///getFilterDatas
router.post('/getFilterDatas', function (req, res) {
  // console.log("req.body",req.body);

  var startDate = new Date(req.body.startDate);
  var endDate = new Date(req.body.endDate);
  if (new Date() == startDate) {
      startDate.setDate(startDate.getDate());
      endDate.setDate(endDate.getDate());
  }else{
    startDate.setDate(startDate.getDate() );
    endDate.setDate(endDate.getDate() + 1);
  }
  console.log("startDate",startDate);
  console.log("endDate",endDate);
  matchQuery = { $and: [{ "create_date_time": { $gte: startDate } }, { "create_date_time": { $lte: endDate } }],delete_status : false };
 
  ticketModel.aggregate(
      [
        {
          $match: matchQuery
      },
      { $lookup: {from: 'station_names', localField: 'station_detail', foreignField: '_id', as: 'station_detail'}},
       {$unwind: {path: "$station_detail",preserveNullAndEmptyArrays: true}},
       { $lookup: {from: 'job_nos', localField: 'job_detail', foreignField: '_id', as: 'job_detail'}},
       {$unwind: {path: "$job_detail",preserveNullAndEmptyArrays: true}},

      //  { $set: { phase: { $toObjectId: "$phase" } } },
      
    //    {
    //     $lookup: {
    //         let: { "phase": "$phase" },
    //         from: "phases",
    //         pipeline: [
    //             { "$match": { "$expr": { $eq: [{ $toString: "$_id" }, "$$phase"] } } },
    //         ],
    //         as: "Detail"
    //     }
    // },
    // {
    //     $unwind: {
    //         path: "$Detail",
    //         preserveNullAndEmptyArrays: true,
    //     },
    // },
      ],
      function (err, data) {
        // console.log(err);
        if (err) {
          // return commonUtil.makeErrorResponse(res, err, "", "");
        } else {
          // console.log(data);
          res.json({Status:"Success",Message:"Ticket get Filter Datas List", Data : data ,Code:200});
        }
      }
    )
});



// router.post('/getFilterDatas/alldata',async function (req, res) {
//     console.log("data");
//  console.log("Request body",req.body);
//  // await tickethistoryModel.find({  "ticket_no" : req.query.id,delete_status : false}, function (err, StateList) {
//  //    res.json({Status:"Success",Message:"Ticket History List", Data : StateList ,Code:200});
//  //    console.log("err",err)
//  //  });

//  });




router.get('/get_completed_value',async function (req, res) {
    tickethistoryModel.find({ticket_status:'Completed'},async function (err, StateList) {
        // StateList.forEach(element => {
          for(let a  = 0 ; a < StateList.length ; a++ ){
                // console.log(StateList[a].date_of_create);
            var ticket_detail = await ticketModel.findOne({ticket_no:StateList[a].ticket_no});
                console.log(StateList[a].date_of_create+"-"+ticket_detail.restored_time+"-"+ticket_detail.ticket_no+"-"+ticket_detail.status);
                ticketModel.findByIdAndUpdate(ticket_detail._id,{restored_time: StateList[a].date_of_create }, {new: true}, function (err, UpdatedDetails) {
                     if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
                        console.log("updated");
                    });
            if(a == StateList.length - 1){
              res.json({Status:"Success",Message:"Updated Complete Time", Data : {} ,Code:200});
            }
          }
    });
});



router.post('/fetch_ticket_no',async function (req, res) {
    var ticket_detail = await ticketModel.find({ticket_no:req.body.ticket_no});
    console.log("ticket_detail",ticket_detail);
    res.json({Status:"Success",Message:"Updated Complete Time", Data : ticket_detail ,Code:200});
});

router.post('/history_fetch_ticket_no',async function (req, res) {
    var ticket_detail = await tickethistoryModel.find({ticket_no:req.body.ticket_no});
    console.log("ticket_detail",ticket_detail);
    res.json({Status:"Success",Message:"Updated Complete Time", Data : ticket_detail ,Code:200});
});



router.post('/getFilterDatas_alldatas', function (req, res) {
  // console.log("rew",req.body);
  let value_data = req.body.data;
  let count_value = req.body.data.length;
  let final_data = [];
  recall();
  async function recall(){
        count_value = count_value - 1;
        // console.log(value_data[count_value]);
        tickethistoryModel.find({ticket_no:value_data[count_value]}, function (err, StateList) {
          // console.log(StateList);
          final_data.push(StateList);
          if(count_value == 0){
            res.json({Status:"Success",Message:"Ticket History List", Data : final_data ,Code:200});
          }else{
            recall();
          }
        }).populate("user_id");
  }
        // tickethistoryModel.find({ticket_no:req.body.ticket_no}, function (err, StateList) {
        //   res.json({Status:"Success",Message:"Ticket History List", Data : StateList ,Code:200});
        // }).populate("user_id");
});








router.get('/getlist_null', function (req, res) {
        ticketModel.find({}, function (err, Functiondetails) {
          for(let a = 0 ; a < Functiondetails.length ; a++){
             if(Functiondetails[a].station_detail == null){
            console.log("True");
           ticketModel.findByIdAndRemove(Functiondetails[a]._id, function (err, user) {
           if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
            // res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
         });
            }
            if(a == Functiondetails.length - 1){
                res.json({Status:"Success",Message:"Job No List Details", Data : Functiondetails ,Code:200});
            }
          }
        }).populate("station_detail job_detail");
});




module.exports = router;
