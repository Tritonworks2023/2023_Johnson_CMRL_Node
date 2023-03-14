var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var attendanceModel = require('./../models/attendanceModel');


router.post('/create', async function(req, res) {
  var attendance_detail = await attendanceModel.findOne({user_id:req.body.user_id,date:req.body.date});
  console.log(attendance_detail);
  if(attendance_detail == null){
      try{
        await attendanceModel.create({
            user_id:  req.body.user_id,
            date : req.body.date,
            check_in_time : req.body.check_in_time,
            check_in_datetime : req.body.check_in_datetime,
            check_out_time : "",
            check_out_datetime : "",
            delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Attendance Created", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
  }else{
       attendanceModel.findByIdAndUpdate(attendance_detail._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Attendance Updated", Data : UpdatedDetails ,Code:200});
        });
  }
});







router.post('/check_attendance',async function (req, res) {
    var attendance_detail = await attendanceModel.findOne({user_id:req.body.user_id,date:req.body.date});
    if(attendance_detail == null){
     let a = {
      check_in_time : "",
      check_in_datetime : "",
      check_out_time : "",
      check_out_datetime : "",
      ischecked : false
     }
    res.json({Status:"Success",Message:"check attendance", Data : a ,Code:200});
    }else {
       let a = {
      check_in_time : attendance_detail.check_in_time,
      check_in_datetime : attendance_detail.check_in_datetime,
      check_out_time : attendance_detail.check_out_time,
      check_out_datetime : attendance_detail.check_out_datetime,
      ischecked : true
     }
    res.json({Status:"Success",Message:"check attendance", Data : a ,Code:200});
    }
});

router.get('/deletes', function (req, res) {
      attendanceModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"attendanceModel Deleted", Data : {} ,Code:200});     
      });
});

router.delete('/delete/:id', function (req, res) {
       console.log(req.params.id);
       attendanceModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Station Deleted Successfully", Data : {} ,Code:200});
      });
});

router.get('/getlist', function (req, res) {
        attendanceModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Station Details List", Data : Functiondetails ,Code:200});
        });
});


router.put('/update/:id', function (req, res) {
        attendanceModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Station Detail Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        attendanceModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      attendanceModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
