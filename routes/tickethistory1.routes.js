var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var tickethistoryModel = require('./../models/tickethistoryModel');
var ticketModel = require('./../models/ticketModel');



router.post('/create', async function(req, res) {
    var ticket_detail = await ticketModel.findOne({ticket_no:req.body.ticket_no});
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
          status : req.body.ticket_status
        }
        ticketModel.findByIdAndUpdate(ticket_detail._id, c, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             // res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
              res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });       
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
 
});



router.post('/update', async function(req, res) {
    var ticket_detail = await ticketModel.findOne({ticket_no:req.body.ticket_no});
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
          verified_by : req.body.user_id,
          restored_time : req.body.date_of_create
        }
        ticketModel.findByIdAndUpdate(ticket_detail._id, c, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             // res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
              res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });       
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});

router.post('/getlist_by_ticket_no', function (req, res) {
        tickethistoryModel.find({ticket_no:req.body.ticket_no}, function (err, StateList) {
          res.json({Status:"Success",Message:"Ticket History List", Data : StateList ,Code:200});
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
module.exports = router;
