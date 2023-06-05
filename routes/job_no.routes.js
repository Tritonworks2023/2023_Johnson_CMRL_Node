var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var job_noModel = require('./../models/job_noModel');


router.post('/create', async function(req, res) {
  try{

        await job_noModel.create({
            station_id:  req.body.station_id,
            job_no :  req.body.job_no,
            unique_id : req.body.unique_id,
            serving_level : req.body.serving_level,
            created_date :req.body.created_date,
            delete_status : false,
            phase:req.body.phase,
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


router.get('/deletes', function (req, res) {
      job_noModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"job_noModel Deleted", Data : {} ,Code:200});     
      });
});



router.get('/get_jobno/lift', function (req, res) {
 
  var matchQuery={
    delete_status : false
  };
  
     job_noModel.find(matchQuery, function (err, Functiondetails) {
         var final_output = [];

         for(let a  = 0 ; a < Functiondetails.length ;a ++){
          if(Functiondetails[a].station_id.type == "1"){
            let c = {
              _id :  Functiondetails[a]._id,
              job_no : Functiondetails[a].job_no
            }
            final_output.push(c);
          }        
          if(a == Functiondetails.length - 1){
            res.json({Status:"Success",Message:"Job No1 List Details", Data : final_output ,Code:200});
          }
         }   
        }).populate("station_id");
});


router.get('/get_jobno/newlift', function (req, res) {
  var phaseID = req.query.id ? req.query.id:null;
  var matchQuery={
    delete_status : false
  };
  if(phaseID){
    matchQuery.phase = phaseID;
  }
     job_noModel.find(matchQuery, function (err, Functiondetails) {
         var final_output = [];
        if(Functiondetails && Functiondetails.length > 0){
          for(let a  = 0 ; a < Functiondetails.length ;a ++){
            if(Functiondetails[a].station_id.type == "1"){
              let c = {
                _id :  Functiondetails[a]._id,
                job_no : Functiondetails[a].job_no
              }
              final_output.push(c);
            }        
            if(a == Functiondetails.length - 1){
              res.json({Status:"Success",Message:"Job No List Details", Data : final_output ,Code:200});
            }
           } 
        }else{
          res.json({Status:"Success",Message:"Empty Records", Data : final_output ,Code:200});
        }
          
        }).populate("station_id");
});


router.get('/get_jobno/elivator', function (req, res) {
  
  var matchQuery={
    delete_status : false
  };
 
        job_noModel.find(matchQuery, function (err, Functiondetails) {
         var final_output = [];

         for(let a  = 0 ; a < Functiondetails.length ;a ++){
          if(Functiondetails[a].station_id.type == "2"){
            let c = {
              _id :  Functiondetails[a]._id,
              job_no : Functiondetails[a].job_no
            }
            final_output.push(c);
          }        
          if(a == Functiondetails.length - 1){
            res.json({Status:"Success",Message:"Job No List Details", Data : final_output ,Code:200});
          }
         }   
        }).populate("station_id");
});


router.get('/get_jobno/newelivator', function (req, res) {
  var phaseID = req.query.id ? req.query.id:null;
  var matchQuery={
    delete_status : false
  };
  if(phaseID){
    matchQuery.phase = phaseID;
  }
  console.log("matchQuery",matchQuery);
        job_noModel.find(matchQuery, function (err, Functiondetails) {
         var final_output = [];
        
         if(Functiondetails && Functiondetails.length > 0){
          for(let a  = 0 ; a < Functiondetails.length ;a ++){
            if(Functiondetails[a].station_id.type == "2"){
              let c = {
                _id :  Functiondetails[a]._id,
                job_no : Functiondetails[a].job_no
              }
              final_output.push(c);
            }        
            if(a == Functiondetails.length - 1){
              res.json({Status:"Success",Message:"Job No List Details", Data : final_output ,Code:200});
            }
           }  
         }else{
          res.json({Status:"Success",Message:"Empty Records", Data : final_output ,Code:200});
         }
        
        }).populate("station_id");
});



router.post('/getlist_by_station_id', function (req, res) {
        job_noModel.find({station_id:req.body.station_id,delete_status : false}, function (err, StateList) {
          res.json({Status:"Success",Message:"job no list by station id ", Data : StateList ,Code:200});
        });
});


router.put('/update/:id', function (req, res) {
        job_noModel.findByIdAndUpdate(req.params.id,req.body,{new: true}, function (err, UpdatedDetails) {
            console.log(err)
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
            console.log(err);
             res.json({Status:"Success",Message:"job no Detail Updated", Data : UpdatedDetails ,Code:200});
        });
});



router.delete('/delete/:id', function (req, res) {
       console.log(req.params.id);
       job_noModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"job no deleted successfully", Data : {} ,Code:200});
      });
});



router.get('/getlist', function (req, res) {
        job_noModel.find({delete_status : false}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Job No List Details", Data : Functiondetails ,Code:200});
        }).populate("station_id");
});



router.get('/getlistss', function (req, res) {
        job_noModel.find({}, function (err, Functiondetails) {   
           for(let a = 0 ; a < Functiondetails.length ; a++){
           let c = {
           created_date : "2021-07-01T00:00:00.000Z"
           }
        job_noModel.findByIdAndUpdate(Functiondetails[a]._id,c, {new: true}, function (err, UpdatedDetails){
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
        });
            if(a == Functiondetails.length - 1){
               res.json({Status:"Success",Message:"Functiondetails Updated", Data : '' ,Code:200});
            }
           }

        }).populate("station_id");
});

router.post('/edit', function (req, res) {
        job_noModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            console.log(err);
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      job_noModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
