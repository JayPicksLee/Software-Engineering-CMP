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

router.delete(
  '/', 
  (req, res)=>{
    const id = parseInt(req.body.id)
    data2 = data2.filter(lot => lot.carparkId !== id);

    res.redirect('/mainAdmin');
})

module.exports = router;