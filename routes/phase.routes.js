var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var PhaseModel = require('../models/phase.model');


router.post('/create', async function (req, res) {
    console.log("req",req.body);
    var details = await PhaseModel.findOne({ phase: req.body.phase});
    if (details == null) {
        try {
            await PhaseModel.create({
                phase: req.body.phase,
                delete_status: false
            },
                function (err, user) {
                    console.log(user)
                    res.json({ Status: "Success", Message: "Added successfully", Data: user, Code: 200 });
                });
        }
        catch (e) {
            res.json({ Status: "Failed", Message: "Internal Server Error", Data: {}, Code: 500 });
        }
    } else {
        res.json({ Status: "Failed", Message: "This Name already there in the table", Data: {}, Code: 500 });
    }
});


router.get('/getlist', function (req, res) {
    PhaseModel.find({}, function (err, Functiondetails) {
        res.json({ Status: "Success", Message: "Station Details List", Data: Functiondetails, Code: 200 });
    });
});


router.put('/update/:id', function (req, res) {
    PhaseModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, UpdatedDetails) {
        if (err) return res.json({ Status: "Failed", Message: "Internal Server Error", Data: {}, Code: 500 });
        res.json({ Status: "Success", Message: "Station Detail Updated", Data: UpdatedDetails, Code: 200 });
    });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      PhaseModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;
