var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var station_nameModel = require('./../models/station_nameModel');


router.post('/create', async function(req, res) {
  
  var Station_details = await station_nameModel.findOne({station_name:req.body.station_name,type:req.body.type});
  if(Station_details == null){
  try{
        await station_nameModel.create({
            station_name:  req.body.station_name,
            type : req.body.type,
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
  }else{
    res.json({Status:"Failed",Message:"This Name already there in the table", Data : {},Code:500});
  }
});


router.post('/getlist_by_type', function (req, res) {
        station_nameModel.find({type:req.body.type}, function (err, StateList) {
    StateList.sort(function(a, b){
    if(a.station_name < b.station_name) { return -1; }
    if(a.station_name > b.station_name) { return 1; }
    return 0;
})
          res.json({Status:"Success",Message:"Station name List", Data : StateList ,Code:200});
        });
});

router.get('/deletes', function (req, res) {
      station_nameModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"station_nameModel Deleted", Data : {} ,Code:200});     
      });
});

router.delete('/delete/:id', function (req, res) {
       console.log(req.params.id);
       station_nameModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Station Deleted Successfully", Data : {} ,Code:200});
      });
});

router.get('/getlist', function (req, res) {
        station_nameModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Station Details List", Data : Functiondetails ,Code:200});
        });
});


router.put('/update/:id', function (req, res) {
        station_nameModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Station Detail Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        station_nameModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      station_nameModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
