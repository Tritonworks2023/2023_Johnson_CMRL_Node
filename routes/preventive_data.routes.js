var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var preventive_dataModel = require('./../models/preventive_dataModel');


router.post('/create', async function(req, res) {
  try{

        await preventive_dataModel.create({
month :req.body.month,
type :req.body.type,
location :req.body.location,
escalatorId :req.body.escalatorId,
jobNo :req.body.jobNo,
reportno :req.body.reportno,
plannedDate :req.body.plannedDate,
replacement_date : req.body.replacement_date,
completedDate :req.body.completedDate,
componentsReplaced :req.body.componentsReplaced,
partsDescription  :req.body.partsDescription,
qty :req.body.qty,
remarks :req.body.remarks,
date_of_create :req.body.date_of_create,
date_of_update :req.body.date_of_update,
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


router.get('/deletes', function (req, res) {
      preventive_dataModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"preventive_data Deleted", Data : {} ,Code:200});     
      });
});


router.post('/change_date_format',async function (req, res) {
        preventive_dataModel.find({},async function (err, StateList) {
          for(let a  = 0 ; a < StateList.length ;a++){
             var string = StateList[a].plannedDate.split("T");
             if(string.length == 2){
                 console.log(StateList[a].jobNo);
                 console.log(string[0]);
                 console.log("Data Found");
             }
            if(a == StateList.length - 1){
                res.json({Status:"Success",Message:"preventive_data  list by station id ", Data : {} ,Code:200});
            }
          }
          // res.json({Status:"Success",Message:"preventive_data  list by station id ", Data : StateList ,Code:200});
        });
});




router.get('/get_jobno/lift', function (req, res) {
        preventive_dataModel.find({delete_status : false}, function (err, Functiondetails) {
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
            res.json({Status:"Success",Message:"preventive_data  List Details", Data : final_output ,Code:200});
          }
         }   
        }).populate("station_id");
});


router.get('/get_jobno/elivator', function (req, res) {
        preventive_dataModel.find({delete_status : false}, function (err, Functiondetails) {
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
            res.json({Status:"Success",Message:"preventive_data  List Details", Data : final_output ,Code:200});
          }
         }   
        }).populate("station_id");
});



router.post('/getlist_by_station_id', function (req, res) {
        preventive_dataModel.find({station_id:req.body.station_id,delete_status : false}, function (err, StateList) {
          res.json({Status:"Success",Message:"preventive_data  list by station id ", Data : StateList ,Code:200});
        });
});


router.put('/update/:id', function (req, res) {
        preventive_dataModel.findByIdAndUpdate(req.params.id,req.body,{new: true}, function (err, UpdatedDetails) {
            console.log(err)
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
            console.log(err);
             res.json({Status:"Success",Message:"preventive_data  Detail Updated", Data : UpdatedDetails ,Code:200});
        });
});



router.delete('/delete/:id', function (req, res) {
       console.log(req.params.id);
       preventive_dataModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"preventive_data  deleted successfully", Data : {} ,Code:200});
      });
});



router.get('/getlist', function (req, res) {
        preventive_dataModel.find({delete_status : false}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"preventive_data  List Details", Data : Functiondetails ,Code:200});
        }).populate("station_id");
});



router.post('/getlist_by_type', function (req, res) {
        preventive_dataModel.find({type :req.body.type,delete_status : false}, function (err, Functiondetails) {
const arr = Functiondetails;
const ids = arr.map(o => o.month)
const filtered = arr.filter(({month}, index) => !ids.includes(month, index + 1))
console.log(filtered);
          res.json({Status:"Success",Message:"preventive_data  List Details", Data : filtered ,Code:200});
        });
});




router.post('/getlist_by_month', function (req, res) {
        preventive_dataModel.find({type :req.body.type,month :req.body.month,delete_status : false}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"preventive_data  List Details", Data : Functiondetails ,Code:200});
        }).sort({createdAt:-1});
});





router.post('/excel_upload_value', function (req, res) {
// console.log(req.body);
var count = 0;
recall(count);
async function recall(count)
{
   if(count < req.body.excelData.length){
   var Station_details = await preventive_dataModel.findOne({
month : req.body.month,
type : req.body.type,
location : req.body.excelData[count].location,
escalatorId : req.body.excelData[count].escalatorId,
jobNo : req.body.excelData[count].jobNo
  });

   console.log(Station_details);
  if(Station_details == null){
try{

   console.log('Data in');
   console.log(req.body.excelData[count]);
     console.log(req.body.excelData[count].plannedDate); 
      if(req.body.excelData[count].plannedDate !== undefined){
     var dat = new Date(req.body.excelData[count].plannedDate);
     dat.setDate(dat.getDate() + 1); 
     req.body.excelData[count].plannedDate = new Date(dat).toISOString();
     console.log(req.body.excelData[count].plannedDate);
      }

  await preventive_dataModel.create({
month : req.body.month,
type : req.body.type,
location : req.body.excelData[count].location,
escalatorId : req.body.excelData[count].escalatorId,
jobNo : req.body.excelData[count].jobNo,
replacement_date : '',
reportno : req.body.excelData[count].reportno,
plannedDate : req.body.excelData[count].plannedDate,
completedDate : req.body.excelData[count].completedDate,
componentsReplaced : req.body.excelData[count].componentsReplaced,
partsDescription  : req.body.excelData[count].partsDescription,
qty : req.body.excelData[count].qty,
remarks : req.body.excelData[count].remarks,
date_of_create : new Date(),
date_of_update : '',
delete_status : false
        }, 
function (err, user) {
console.log(user)
        // res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
count = count + 1;
 recall(count);
        });
}
catch(e){
      // res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
  } else {
    req.body.excelData[count].key = "true";
    count = count + 1;
    recall(count);
  }
   } else {
    res.json({Status:"Success",Message:"Added successfully", Data : req.body ,Code:200}); 
   } 
}
});





router.post('/delete_month_wise',async function (req, res) {
    console.log(req.body);
          var Station_details = await preventive_dataModel.find({
          month : req.body.month,
          type : req.body.type
          });
          console.log(Station_details.length);
          if(Station_details.length == 0){
            res.json({Status:"Success",Message:"Deleted successfully", Data : {} ,Code:200});
          }else {
            for(let a = 0; a < Station_details.length; a++){
                 preventive_dataModel.findByIdAndRemove(Station_details[a]._id, function (err, user) {
                 if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
                 // res.json({Status:"Success",Message:"preventive_data  Deleted successfully", Data : {} ,Code:200});
                 });
              if(a == Station_details.length - 1){
                 res.json({Status:"Success",Message:"Deleted successfully", Data : {} ,Code:200});
              }
            }
          }
});



router.post('/excel_export_data', function (req, res) {
    console.log(req.body);
        preventive_dataModel.find({jobNo:req.body.job_no,type:req.body.type}, function (err, Functiondetails) {   
         final_data = [];
         console.log(Functiondetails);
         if(Functiondetails.length !== 0){
             for(let a = 0 ; a < Functiondetails.length ; a++){
             if(Functiondetails[a].replacement_date !== ''){
                var from_date = new Date(req.body.start_date).toISOString().slice(0, 10);
                var to_date = new Date(req.body.end_date).toISOString().slice(0, 10);
                var valid_date = new Date(Functiondetails[a].replacement_date).toISOString().slice(0, 10);
                console.log(from_date,to_date,valid_date);
                if((valid_date <= to_date && valid_date >= from_date)) {
                   final_data.push(Functiondetails[a]);
                } 
             }
            if(a == Functiondetails.length - 1){
               res.json({Status:"Success",Message:"preventive_data  Updated", Data : final_data ,Code:200});
            }
           }
         }else {
            res.json({Status:"Success",Message:"preventive_data  Updated", Data : final_data ,Code:200});
         }
        });
});



router.post('/fetch_job_no_by_type', function (req, res) {
    preventive_dataModel.find({type:req.body.type}, function (err, Functiondetails) {     
        var final_data = [];
        for(let a = 0 ; a < Functiondetails.length ; a++){
        final_data.push({
            job_no : Functiondetails[a].jobNo
        });
        if(a == Functiondetails.length - 1){
         res.json({Status:"Success",Message:"preventive_data  Updated", Data : final_data ,Code:200});
        }
     }
    });
});




router.get('/getlistss', function (req, res) {
        preventive_dataModel.find({}, function (err, Functiondetails) {   
           for(let a = 0 ; a < Functiondetails.length ; a++){
           let c = {
           replacement_date : ""
           }
        preventive_dataModel.findByIdAndUpdate(Functiondetails[a]._id,c, {new: true}, function (err, UpdatedDetails){
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
        });
            if(a == Functiondetails.length - 1){
               res.json({Status:"Success",Message:"preventive_data  Updated", Data : '' ,Code:200});
            }
           }

        }).populate("station_id");
});


router.post('/update_report_no',async function (req, res) {
        preventive_dataModel.find({"month": "2022-11", "type": "LIFT"}, function (err, Functiondetails) { 
             var index = 0;
             recall(index);
            async function recall(index){
                if(index < Functiondetails.length) {
                 console.log(Functiondetails[index].reportno);
                 var lastFive = Functiondetails[index].reportno.substr(Functiondetails[index].reportno.length - 3)
                 var values = "L-"+req.body.dates+"-"+lastFive;
                 console.log(values); 
                index = index + 1;
                 recall(index);
                }
              if(index == Functiondetails.length - 1){
                res.json({Status:"Success",Message:"preventive_data  Updated", Data : '' ,Code:200});
              }
             }           
        });
});





router.post('/monthly_entry_lift',async function (req, res) {
        preventive_dataModel.find({"month": "2022-11", "type": req.body.type}, function (err, Functiondetails) {  //ESCALATOR // LIFT
             var index = 0;
             recall(index);
            async function recall(index){
                if(index < Functiondetails.length) {
                 console.log(Functiondetails[index].reportno);

                 var lastFive = Functiondetails[index].reportno.substr(Functiondetails[index].reportno.length - 3);
                 var lasttwo = Functiondetails[index].plannedDate.substr(Functiondetails[index].plannedDate.length - 2);

                 var values = req.body.type_one+req.body.dates+"-"+lastFive; //L //E
                 var values_one = req.body.dates+"-"+lasttwo;

                 let aa = {
            "month": req.body.dates,
            "type": req.body.type, //ESCALATOR // LIFT
            "location": Functiondetails[index].location,
            "escalatorId": Functiondetails[index].escalatorId,
            "jobNo": Functiondetails[index].jobNo,
            "reportno": values,
            "plannedDate": values_one,
            "date_of_create": "Tue Mar 03 2023 16:05:33 GMT+0530 (India Standard Time)",
            "date_of_update": "",
            "delete_status": false,
            "updatedAt": "2023-01-03T03:32:49.726Z",
            "createdAt": "2023-01-03T10:35:33.517Z",
            "__v": 0,
            "replacement_date": "",
            "componentsReplaced": "",
            "partsDescription": "",
            "qty": "",
            "remarks": "",
            "completedDate": ""
                 }
                console.log("reportno",aa); 
                 await preventive_dataModel.create(aa, function (err, user) { console.log(err) });
                 // console.log("reportno",values,"plannedDate",values_one); 
                index = index + 1;
                 recall(index);
                }
              if(index == Functiondetails.length - 1){
                res.json({Status:"Success",Message:"preventive_data  Updated", Data : '' ,Code:200});
              }
             }           
        });
});






// router.get('/populate_next_month',async function (req, res) {
//         preventive_dataModel.find({"month": "2022-11"},async function (err, Functiondetails) {   
//           res.json({Status:"Success",Message:"preventive_data", Data : Functiondetails ,Code:200});
//            for(let a  = 0;a < Functiondetails.length ; a++){
//              console.log(Functiondetails[a].month);
//              var month = Functiondetails[a].month.split("-");
//                 console.log(Functiondetails[a].reportno);
//              var reportno = Functiondetails[a].reportno.split("-");
//                 console.log(Functiondetails[a].plannedDate);
//              var plannedDate = Functiondetails[a].plannedDate.split("-");
//              try{
//         await preventive_dataModel.create({
//             "month": ""+month[0]+"-12",
//             "type": Functiondetails[a].type,
//             "location": Functiondetails[a].location,
//             "escalatorId": Functiondetails[a].escalatorId,
//             "jobNo": Functiondetails[a].jobNo,
//             "reportno": ""+reportno[0]+"-"+reportno[1]+"-12-"+reportno[3],
//             "plannedDate": ""+plannedDate[0]+"-12-"+plannedDate[2],
//             "date_of_create": "Thu Dec 05 2022 16:05:33 GMT+0530 (India Standard Time)",
//             "date_of_update": "",
//             "replacement_date": "",
//             "completedDate": "",
//             "componentsReplaced": "",
//             "partsDescription": "",
//             "qty": "",
//             "remarks": "",
//              delete_status : false,
//              date_of_update :"Thu Dec 05 2022 16:05:33 GMT+0530 (India Standard Time)",
//             }, 
//         function (err, user) {
//           console.log(user)
//         // res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
//         });
// }
// catch(e){
//       res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
// }
//            }
//         });
// });


router.post('/edit', function (req, res) {
        preventive_dataModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            console.log(err);
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"preventive_data  Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      preventive_dataModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"preventive_data  Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
