var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var part_noModel = require('./../models/part_noModel');


router.post('/create', async function(req, res) {
  
  var Station_details = await part_noModel.findOne({part_type:req.body.part_type,part_no:req.body.part_no});
  if(Station_details == null){
  try{
        await part_noModel.create({
            part_type:  req.body.part_type,
            part_no:  req.body.part_no,
            part_name:  req.body.part_name,
            delete_status : false,
            phase:req.body.phase
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
  }else{
    res.json({Status:"Failed",Message:"This part no already there in the table", Data : {},Code:500});
  }
});


router.post('/getlist_by_type', function (req, res) {
        part_noModel.find({type:req.body.type}, function (err, StateList) {
    StateList.sort(function(a, b){
    if(a.station_name < b.station_name) { return -1; }
    if(a.station_name > b.station_name) { return 1; }
    return 0;
})
          res.json({Status:"Success",Message:"Part No List", Data : StateList ,Code:200});
        });
});






router.post('/insert_data_form_oracle',async function (req, res) {

    console.log(req.body.value);
      var index = 0 ;
      recall(index);
     async function recall(index){
       if(index < req.body.value.length){
        if(req.body.value[index].part_type == 'LIFT'){
            req.body.value[index].part_type = "1"
        }else {
            req.body.value[index].part_type = "2"
        }
      var Station_details = await part_noModel.findOne({part_type:req.body.value[index].part_type,part_no:req.body.value[index].part_no});
      if(Station_details == null){
      try{
        await part_noModel.create({
            part_type:  req.body.value[index].part_type,
            part_no:  req.body.value[index].part_no,
            part_name:  req.body.value[index].part_name,
            delete_status : false
        }, 
        function (err, user) {
            console.log("inserted index of "+ index);
        });
        }
       catch(e){
       index = index + 1;
       recall(index);
       }
       index = index + 1;
       recall(index);
       }else{
       index = index + 1;
       recall(index);
       }
       }else {
         res.json({Status:"Success",Message:"Uploaded", Data : {} ,Code:200});
       }
      }
});

router.post('/getlist_by_parttype', function (req, res) {
     part_noModel.find({part_type:req.body.part_type}, function (err, StateList) {
          res.json({Status:"Success",Message:"Part No List", Data : StateList ,Code:200});
        });
});



router.get('/deletes', function (req, res) {
      part_noModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Part No Deleted", Data : {} ,Code:200});     
      });
});

router.delete('/delete/:id', function (req, res) {
       console.log(req.params.id);
       part_noModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Part No Deleted Successfully", Data : {} ,Code:200});
      });
});

router.get('/getlist', function (req, res) {
        part_noModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Part No Details List", Data : Functiondetails ,Code:200});
        });
});


router.put('/update/:id', function (req, res) {
        part_noModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Part No Detail Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        part_noModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Part No Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      part_noModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Part No Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
