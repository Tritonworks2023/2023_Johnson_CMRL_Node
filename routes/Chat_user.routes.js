var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var chat_userModel = require('./../models/chat_userModel');
// var VerifyToken = require('./VerifyToken');
// const { check, validationResult } = require('express-validator');

router.post('/create', async function(req, res) {
  try{
     var chat_user_Details = await chat_userModel.findOne({Email_id:req.body.Email_id});
     console.log(chat_user_Details);
     if(chat_user_Details == null){
     await chat_userModel.create({
         Company_name : req.body.Company_name || "",
         Contact_number : req.body.Contact_number || "",
         Email_id : req.body.Email_id || "",
         User_id : req.body.User_id || "",
         Phone : req.body.Phone || "",
         Password : req.body.Password || "",
        },
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Chat User Added successfully", Data : user ,Code:200}); 
    });   
       } else{
        res.json({Status:"Failed",Message:"This User Id already Created", Data : {} ,Code:404}); 
       }
}
catch(e){
  console.log(e);
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
}
);






router.post('/forgotpassword',  function(req, res) {
      chat_userModel.findOne({ Email_id: req.body.Email_id }, async function (err, user) {
        if (err) return res.error(500, "Internal server Error");
        console.log(user);
        if (user == null){
         res.json({Status:"Failed",Message:"Invalid Email Id. Enter registered Email id", Data : {},Code:300});
        } else {     
        var passworddata = await chat_userModel.findOne({Email_id:req.body.Email_id});
        console.log('Testif',passworddata);
       var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'theteamordr@gmail.com',
            pass: 'ordr2020'
          }
        });
        var mailOptions = {
          to: req.body.vendor_email,
          subject: 'Forgot password Mail',
          text: "Please check your password : " + passworddata.Password,
      };
       transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          console.log("erorr related the mail ", error);
          } else {
          console.log('Email sent: ' + info.response);
          }
        });
       res.json({Status:"Success",Message:"Password has been sent to the registered Email ID", Data : {},Code:200});
           }
      });
});


router.post('/login',async function (req, res) {
      await chat_userModel.findOne({Email_id:req.body.User_id,Password:req.body.Password}, function (err, UserDetails) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      if(UserDetails  == null){
           res.json({Status:"Success",Message:"User Not Found", Data : {} ,Code:404});  
      }else{
        res.json({Status:"Success",Message:"User Details", Data : UserDetails ,Code:200});
      }
      });
})



router.get('/getlist', async function (req, res) {
        await chat_userModel.find({}, function (err, CategoryDetails) {
          if(err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(CategoryDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Financialyrs", Data : CategoryDetails ,Code:200});
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
      chat_userModel.remove({}, function (err, user) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      res.json({Status:"Success",Message:"Financialyrs Deleted all", Data : {} ,Code:200});     
      });
});


router.get('/getlist_dropdown', async function (req, res) {
        await chat_userModel.find({status:'false'}, function (err, CategoryDetails) {
          if(err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(CategoryDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Financialyrs", Data : CategoryDetails ,Code:200});
        }).sort({createdAt:-1});
});


router.post('/edit', async function (req, res) {
  console.log(req.body);
        await chat_userModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             if(UpdatedDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
             res.json({Status:"Success",Message:"Updated successfully", Data : UpdatedDetails ,Code:200});
        });
});


// // DELETES A USER FROM THE DATABASE
router.post('/delete', async function (req, res) {
      await chat_userModel.findByIdAndRemove(req.body.Category_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(user == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Category Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;