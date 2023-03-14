var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var chat_billingModel = require('./../models/chat_billingModel');
// var VerifyToken = require('./VerifyToken');
// const { check, validationResult } = require('express-validator');

router.post('/create', async function(req, res) {
  try{
     await chat_billingModel.create({
         Bill_No : req.body.Bill_No || "",
         User_Number : req.body.User_Number || "",
         User_Name : req.body.User_Name || "",
         Cash_type : req.body.Cash_type || "",
         Grand_total : req.body.Grand_total || "",
         Item_Details : req.body.Item_Details || "",
         billing_time : req.body.billing_time || ""
        },
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"category Added successfully", Data : user ,Code:200}); 
    });       
}
catch(e){
  console.log(e);
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
}
);



router.post('/getlist_id',async function (req, res) {
let st_date = req.body.startdate + " 00:00:00";
let en_date = req.body.enddate + " 00:00:00";
await chat_billingModel.find({
    createdAt: {
        $gte: st_date,
        $lte:  en_date
    }
}, function (err, UserDetails) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
        res.json({Status:"Success",Message:"User Details", Data : UserDetails ,Code:200});
      });
})



router.post('/userlogout',async function (req, res) {
await chat_billingModel.find({}, function (err, UserDetails) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      // console.log(UserDetails);
      let final_data = [];
      // console.log(UserDetails.length);
      for(let a  = 0  ; a < UserDetails.length ; a++){
           let report_Date = new Date(UserDetails[a].billing_time);
           let st_date = new Date(req.body.st_date);
           let en_date = new Date(req.body.en_date);

           console.log(st_date,en_date,report_Date);
           if(report_Date > st_date && report_Date < en_date){
              console.log("true");
              final_data.push(UserDetails[a]);
           }
           if(a == UserDetails.length - 1){
            res.json({Status:"Success",Message:"Userlogoutreports", Data : final_data ,Code:200});
           }
      }
      });
})








router.get('/getlist', async function (req, res) {
        await chat_billingModel.find({}, function (err, CategoryDetails) {
          if(err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(CategoryDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
           let datas = [];
           for(let a  = 0 ; a < CategoryDetails.length ; a ++){
            console.log(CategoryDetails[a].Grand_total);
            if(CategoryDetails[a].Grand_total == null){
              datas.push(CategoryDetails[a]._id);
            }
            if(a == CategoryDetails.length - 1){
              res.json({Status:"Success",Message:"Financialyrs", Data : CategoryDetails , goal : datas, Code:200});
            }
           }
          
        }).sort({createdAt:-1});
});



router.get('/getlist_fnyr', async function (req, res) {
          let start_yr =  1971;
          let end_yr = 2050
          let years = [];
        for(let a = start_yr ; a < end_yr ; a ++){
          let x = a+2;
          let y = a+1 +" - "+ x;
          years.push(y);
          if(a == end_yr - 1){
            res.json({Status:"Success",Message:"Financialyrs", Data : years ,Code:200});    
          }
        }
});




router.get('/deletes', function (req, res) {
      chat_billingModel.remove({}, function (err, user) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      res.json({Status:"Success",Message:"Financialyrs Deleted all", Data : {} ,Code:200});     
      });
});


router.get('/getlist_dropdown', async function (req, res) {
        await chat_billingModel.find({status:'false'}, function (err, CategoryDetails) {
          if(err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(CategoryDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Financialyrs", Data : CategoryDetails ,Code:200});
        }).sort({createdAt:-1});
});


router.post('/edit', async function (req, res) {
  console.log(req.body);
        await chat_billingModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             if(UpdatedDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
             res.json({Status:"Success",Message:"Updated successfully", Data : UpdatedDetails ,Code:200});
        });
});


// // DELETES by array id ///
router.post('/delete_id', async function (req, res) {
for(let a = 0 ; a < req.body.goals.length ; a ++){
        await chat_billingModel.findByIdAndRemove(req.body.goals[a], function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(user == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
      });
        if(a == req.body.goals.length - 1){
          res.json({Status:"Success",Message:"Deleted successfully", Data : {} ,Code:200});
        }
}



});


// // DELETES A USER FROM THE DATABASE
router.post('/delete', async function (req, res) {
      await chat_billingModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(user == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Category Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;