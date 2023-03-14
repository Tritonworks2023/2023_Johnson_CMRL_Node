var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var sale_categoryModel = require('./../models/sale_categoryModel');


router.post('/create', async function(req, res) {
  try{
     var chat_cat_Details = await sale_categoryModel.findOne({sale_cat_name:req.body.sale_cat_name,sale_cat_img:req.body.sale_cat_img});
     console.log(chat_cat_Details);
     if(chat_cat_Details == null){
     await sale_categoryModel.create({
  sale_cat_name:  req.body.sale_cat_name || "",
  sale_cat_img:  req.body.sale_cat_img || "",
  sale_cat_visible: 'visible',
        },
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"category Added successfully", Data : user ,Code:200}); 
    });   
       } else{
        res.json({Status:"Failed",Message:"This category already Created", Data : {} ,Code:404}); 
       }
}
catch(e){
  console.log(e);
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
}
);



router.post('/getlist_id',async function (req, res) {
      await sale_categoryModel.find({User_id:req.body.User_id}, function (err, UserDetails) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
        res.json({Status:"Success",Message:"User Details", Data : UserDetails ,Code:200});
      }).sort({'createdAt':-1});
})



router.get('/getlist', async function (req, res) {
        await sale_categoryModel.find({}, function (err, CategoryDetails) {
          if(err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(CategoryDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Financialyrs", Data : CategoryDetails ,Code:200});
        });
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
      sale_categoryModel.remove({}, function (err, user) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      res.json({Status:"Success",Message:"Financialyrs Deleted all", Data : {} ,Code:200});     
      });
});


router.get('/getlist_dropdown', async function (req, res) {
        await sale_categoryModel.find({status:'false'}, function (err, CategoryDetails) {
          if(err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(CategoryDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Financialyrs", Data : CategoryDetails ,Code:200});
        }).sort({createdAt:-1});
});


router.post('/edit', async function (req, res) {
  console.log(req.body);
        await sale_categoryModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             if(UpdatedDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
             res.json({Status:"Success",Message:"Updated successfully", Data : UpdatedDetails ,Code:200});
        });
});


// // DELETES A USER FROM THE DATABASE
router.post('/delete', async function (req, res) {
      await sale_categoryModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(user == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Category Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;