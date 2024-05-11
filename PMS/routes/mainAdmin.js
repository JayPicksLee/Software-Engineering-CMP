var express = require('express');
var router = express.Router();
const requestmodel = require('../model/requests.js');
const carparkModel = require('../model/carPark.js');


router.get
('/', 
  async function(req, res, next) {

  let request = await requestmodel.getRequests();
  
  let carpark = await carparkModel.getCarparks();
  
  res.render("mainAdmin", {userRequests: request, carparks: carpark });

});

router.post
('/', 
(req, res)=>
  {
    const name = req.body.newLotName;
    const max_capacity = req.body.newLotMaxCapacity;

    carparkModel.createParkingLot(name, max_capacity);

    res.redirect('/mainAdmin');

});

router.post
('/approveRequest', 
(req, res)=>
  {
    const userid = {_id: req.body.id};
    try {
      console.log(userid);
      
    } catch (error) {
      
    }

});

router.post
('/rejectRequest', 
(req, res)=>
  {
    const userid = {_id: req.body.id};
    try {
      console.log(userid);
      
    } catch (error) {
      
    }

});


router.post
('/deleteLot', 
(req, res)=>
  {
    const userid = {_id: req.body.id};
    try {
      console.log(userid);

      carparkModel.deleteCarpark(userid);

      res.redirect("/mainAdmin");
    } catch (error) {
      
    }

});
module.exports = router;