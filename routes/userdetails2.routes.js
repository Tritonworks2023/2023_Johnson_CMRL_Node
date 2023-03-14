var express = require('express');
var router = express.Router();
const requestss = require("request");
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var GeoPoint = require('geopoint');
var process = require('process');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

var userdetailsModel = require('./../models/userdetailsModel');




router.post('/authenticate', async function(req, res) {
  var user_email = req.body.email;
  var password = req.body.password;
   console.log("user_email ",user_email, "password", password)
  const userFindData = await userdetailsModel.find({user_email : user_email,admin:true});
  const userData = await userdetailsModel.find({user_email : user_email, password: password,admin:true});
  console.log("userFindData ",userFindData, "userData", userData)
  if(userFindData){
      if(userData){
          const token = await jwt.sign({ sub: userData.user_email }, config.secret, { expiresIn: '7d' });
          console.log("token ",token);
          // if(token){
          //   userData.token = token;
          // }
          console.log("userData ",userData);
      }else{
        res.json({Status:"Failed",Message:"user_email or password incorrect", Data : {},Code:500});
      }
     
      res.json({Status:"Success",Message:"Successfully loggin welcome to Johnson",Data : userData , Code:200}); 
  }else{
    res.json({Status:"Failed",Message:"Invalid user", Data : {},Code:500});
     // throw 'Invalid user';
  }
 
});



router.post('/create', async function(req, res) {
  try{
          await userdetailsModel.create({
            admin : req.body.admin ||  false,
            username:  req.body.username || "",
            user_email : req.body.user_email || "",
            password : req.body.password || "",
            user_email_verification : req.body.user_email_verification || false,
            user_phone : req.body.user_phone || "",
            employee_id : req.body.employee_id || 0,
            date_of_reg : ""+new Date(),
            profile_img : "",
            user_type : req.body.user_type,
            user_status : "Incomplete",
            fb_token : "",
            device_id : "",
            device_type : "",
            mobile_type : req.body.mobile_type || "",
            delete_status : false
        }, 
        function (err, user) {
          console.log(err);
          res.json({Status:"Success",Message:"Sign up successfully! welcome to Johnson",Data : user , Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.delete('/delete/:id', function (req, res) {
       console.log(req.params.id);
       userdetailsModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Userdetail Deleted Successfully", Data : {} ,Code:200});
      });
});


router.put('/update/:id', function (req, res) {
        userdetailsModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
            console.log(err);
             res.json({Status:"Success",Message:"Userdetail Detail Updated", Data : UpdatedDetails ,Code:200});
        });
});



router.post('/send/emailotp',async function (req, res) {
  var randomChars = '0123456789';
          var result = '';
          for ( var i = 0; i < 6; i++ ) {
           result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
          }

   console.log(result);
   let phone  =  await userdetailsModel.findOne({user_email:req.body.user_email,user_email_verification:true});
   if(phone !== null){
      res.json({Status:"Failed",Message:"This email Id already Exist", Data : {} ,Code:404});     
   }
   else
   {
    let random = result;
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'carpeinfinitus@gmail.com',
    pass: 'Petfolio@123'
  }
});

var mailOptions = {
  from: 'carpeinfinitus@gmail.com',
  to: req.body.user_email,
  subject: "Email verification OTP",
  text: "Hi, Your OTP is " + random + ". Petfolio OTP for Signup."
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
   
  } else {
   
    res.json({Status:"Success",Message:"Eamil id sent successfully",Data : {
      'email_id': req.body.user_email,
      'otp' : random
    } , Code:200}); 

  }
});

   }   
});



router.get('/sendtestsms', function (req, res) {

        var json = "";
        var username = "tritonitsolutionstrans";
        var password = 20145;
        var mobilno = req.body.user_phone;
        var message =
          "Hi, Your OTP is " + random + ". Petfolio OTP for Signup.";
        // var dumbell = "DUMBELL";
        var dumbell = "VOXITW";
        var tye = 0;
        var baseurls =
          "http://www.smsintegra.com/" +
          "api/smsapi.aspx?uid=" +
          username +
          "&pwd=" +
          password +
          "&mobile=" +
          mobilno +
          "&msg=" +
          message +
          "&sid=" +
          dumbell +
          "&type=" +
          tye;
          requestss(baseurls, { json: true }, async (err, response, body) => {
           if (err) {
            return console.log(err);
          }
          else{
        res.json({Status:"Success",Message:"Sign up successfully! welcome to petfolio",Data : a , Code:200}); 
              }
        });


      // userdetailsModel.remove({}, function (err, user) {
      //     if (err) return res.status(500).send("There was a problem deleting the user.");
      //        res.json({Status:"Success",Message:"User Details Deleted", Data : {} ,Code:200});     
      // });
});




router.get('/deletes', function (req, res) {
      userdetailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"User Details Deleted", Data : {} ,Code:200});     
      });
});


router.post('/filter_date', function (req, res) {
        userdetailsModel.find({}, function (err, StateList) {
          var final_Date = [];
          for(let a = 0; a < StateList.length; a ++){
            var fromdate = new Date(req.body.fromdate);
            var todate = new Date(req.body.todate);
            var checkdate = new Date(StateList[a].createdAt);
          
            if(checkdate >= fromdate && checkdate <= todate){
              final_Date.push(StateList[a]);
            }
            if(a == StateList.length - 1){
              res.json({Status:"Success",Message:"Demo screen  List", Data : final_Date ,Code:200});
            }
          }
        });
});













router.post('/mobile/login',async function (req, res) {
    let userdetails  =  await userdetailsModel.findOne({"user_phone":req.body.user_phone,"user_type" : req.body.user_type,"password":req.body.password});
    console.log(userdetails);
    if(userdetails == null){
       res.json({Status:"Failed",Message:"Unable to Sign In, User account not found", Data : {} ,Code:404});
    }else{
       res.json({Status:"Success",Message:"Logged in successfully", Data : userdetails ,Code:200});
    } 
});





router.post('/getlist_id', function (req, res) {
        userdetailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User Details List", Data : StateList ,Code:200});
        });
});


router.post('/mobile/resendotp', function (req, res) {
        userdetailsModel.findOne({user_phone:req.body.user_phone}, function (err, StateList) {
        if(StateList == null){
           res.json({Status:"Failed",Message:"Invalid Mobile Number", Data : {} ,Code:404});
        }else{
          let a = {
            User_Details : StateList
          }
        var json = "";
        var username = "tritonitsolutionstrans";
        var password = 20145;
        var mobilno = req.body.user_phone;
        var message =
          "Hi, Your OTP is " + StateList.otp + ". Petfolio OTP for signup resend.";
        // var dumbell = "DUMBELL";
        var dumbell = "VOXITW";
        var tye = 0;
        var baseurls =
          "http://www.smsintegra.com/" +
          "api/smsapi.aspx?uid=" +
          username +
          "&pwd=" +
          password +
          "&mobile=" +
          mobilno +
          "&msg=" +
          message +
          "&sid=" +
          dumbell +
          "&type=" +
          tye;
       
        requestss(baseurls, { json: true }, async (err, response, body) => {
           if (err) {
            return 
          }
          else{
          res.json({Status:"Success",Message:"OTP sent successfully! welcome to petfolio", Data : a ,Code:200});
              }
        });
        }
        });
});



router.post('/check_user_admin', function (req, res) {
        userdetailsModel.findOne({user_phone : req.body.user_phone},async function (err, Functiondetails) {
          console.log(Functiondetails);
          if(Functiondetails == null){
         var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          var result = '';
          for ( var i = 0; i < 7; i++ ) {
           result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
          }
       await userdetailsModel.create({
            first_name:  req.body.first_name || "",
            last_name : req.body.last_name || "",
            user_email : req.body.user_email || "",
            user_phone : req.body.user_phone || "",
            date_of_reg : req.body.date_of_reg || "",
            user_type : req.body.user_type,
            ref_code : req.body.ref_code || "",
            my_ref_code : result || "0000000",
            user_status : "Incomplete",
            otp : 123456,
            profile_img : "",
            user_email_verification : req.body.user_email_verification || false,
            fb_token : "",
            device_id : "",
            device_type : "",
            mobile_type : req.body.mobile_type || "",
            delete_status : false
        }, 
        function (err, user) {
                    res.json({Status:"Success",Message:"New User", Data : user ,Code:200});
        });
          }else{
          res.json({Status:"Success",Message:"Old User", Data : Functiondetails ,Code:200});
          }
        });
});



router.post('/check_user', function (req, res) {
        userdetailsModel.findOne({user_phone : req.body.user_phone},async function (err, Functiondetails) {
          console.log(Functiondetails);
          if(Functiondetails == null) {
            res.json({Status:"Success",Message:"New User", Data : Functiondetails ,Code:200});
          }
          else {
          res.json({Status:"Success",Message:"Old User", Data : Functiondetails ,Code:200});
          }
        });
});



router.post('/mobile/update/fb_token', function (req, res) {
  console.log(req.body);
        userdetailsModel.findByIdAndUpdate(req.body.user_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
            console.log(err);
             res.json({Status:"Success",Message:"FB Updated", Data : UpdatedDetails ,Code:200});
             console.log(req.body);
        });
});



router.get('/getlist', function (req, res) {
        userdetailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"User Details Details", Data : Functiondetails ,Code:200});
        });
});




router.post('/mobile/update/fb_token', function (req, res) {
  console.log(req.body);
        userdetailsModel.findByIdAndUpdate(req.body.user_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
            console.log(err);
             res.json({Status:"Success",Message:"FB Updated", Data : UpdatedDetails ,Code:200});
             console.log(req.body);
        });
});


router.post('/mobile/update/profile', function (req, res) {
        userdetailsModel.findByIdAndUpdate(req.body.user_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Profile Updated", Data : UpdatedDetails ,Code:200});
        });
});




router.post('/mobile/edit', function (req, res) {
        userdetailsModel.findByIdAndUpdate(req.body.user_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User Details Updated", Data : UpdatedDetails ,Code:200});
        });
});



router.post('/edit', function (req, res) {
        userdetailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User Details Updated", Data : UpdatedDetails ,Code:200});
        });
});





// // DELETES A USER FROM THE DATABASE
router.post('/delete_by_phone',async function (req, res) {
      let phone  =  await userdetailsModel.findOne({user_phone : req.body.user_phone});
      if(phone == null){
          res.json({Status:"Failed",Message:"Already User Details Deleted successfully", Data : {} ,Code:200});
      }else{
         userdetailsModel.findByIdAndRemove(phone._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:phone.user_phone + " User Details Deleted successfully", Data : {} ,Code:200});
      });
      }
     
});




// // DELETES A USER FROM THE DATABASE
router.post('/admin_delete', function (req, res) {
      userdetailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User Details Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
