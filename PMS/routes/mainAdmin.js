var express = require('express');
var router = express.Router();
const requestmodel = require('../model/requests.js');
const carparkModel = require('../model/carPark.js');

function carparksDiv(data2){
  let carparks = carparkModel.getCarparks();

  for (const carpark of carparks) {
    if (carpark) {

     data2.push(carpark);

    }else{
      res.render('bookings', { error: true, message: "Couldn't post requests" });
    }
  }
  return data2;
}

function requestsDiv(data){
  let requests = requestmodel.getRequests();

  for (const request of requests) {
    if (request.approvedStatus == false) {

      data.push(request);

    }else{
      res.render('bookings', { error: true, message: "Couldn't post requests" });
    }
  }
  return data;
}

router.get
('/', 
function(req, res, next) {
  let data = [];
  let data2 = [];

  requestsDiv(data);
  carparksDiv(data2);

  res.render("mainAdmin", {requests: data, carparks:data2});
});

router.post
('/', 
(req, res, next)=>
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