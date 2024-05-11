var express = require('express');
var router = express.Router();
const requestModel = require('../model/requests.js');
const carparkModel = require('../model/carPark.js');


router.get
('/', 
  async function(req, res, next) {

  let request = await requestModel.getRequests();
  
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
  async (req, res)=>
  {
    const requestId = {_id: req.body.id};
    console.log(requestId);
    requestModel.approveRequest(requestId);

    res.redirect('/mainAdmin');

});

router.post
('/rejectRequest', 
(req, res)=>
  {
    const requestId = {_id: req.body.id};
    try {
      console.log(requestId);
      
      requestModel.rejectRequest(requestId);

      res.redirect("/mainAdmin");
    } catch (error) {
      
    }

});


router.post
('/deleteLot', 
(req, res)=>
  {
    const carparkId = {_id: req.body.id};
    try {
      console.log(carparkId);

      carparkModel.deleteCarpark(carparkId);

      res.redirect("/mainAdmin");
    } catch (error) {
      
    }

});
module.exports = router;