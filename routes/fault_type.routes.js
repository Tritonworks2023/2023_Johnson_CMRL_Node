var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var fault_typeModel = require('./../models/fault_typeModel');


router.post('/create', async function(req, res) {
  try{

        await fault_typeModel.create({
            fault_type: req.body.fault_type,
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
});


router.delete('/delete/:id', function (req, res) {
       console.log(req.params.id);
       fault_typeModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Fault Deleted Successfully", Data : {} ,Code:200});
      });
});

router.put('/update/:id', function (req, res) {
        fault_typeModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Fault Detail Updated", Data : UpdatedDetails ,Code:200});
        });
});

router.get('/deletes', function (req, res) {
      fault_typeModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"fault_typeModel Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_by_type', function (req, res) {
        fault_typeModel.find({type:req.body.type}, function (err, StateList) {
          res.json({Status:"Success",Message:"Fault type list", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        fault_typeModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Fault type", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        fault_typeModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      fault_typeModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
