var express = require('express');
var router = express.Router();
const requestmodel = require('../model/requests.js');
const carparkModel = require('../model/carPark.js');

function carparksDiv(data2){
  let carparks = carparkModel.getCarparks();

  for (const carpark of carparks) {
    console.log(carpark);
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

  console.log(requests);
  for (const request of requests) {
    console.log(request);
    if (request.approvedStatus == false) {

      data.push(request);

    }else{
      res.render('bookings', { error: true, message: "Couldn't post requests" });
    }
  }
  return data;
}

router.get('/', function(req, res, next) {
  let data = [];
  let data2 = [];

  requestsDiv(data);
  carparksDiv(data2);

  res.render("mainAdmin", {requests: data, carparks:data2});
});

module.exports = router;