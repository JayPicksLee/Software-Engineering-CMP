var express = require('express');
var router = express.Router();
const requestmodel = require('../model/requests.js');

router.get(
  '/', 
function(req, res, next) {

  let data = [];

  let requests = requestmodel.getRequests();
  for (const request of requests) {
    
    if (request.userID === req.session.userID) {

      data.push(request);

    }else{
      res.render('bookings', { error: true, message: "Couldn't post requests" });
    }
  }
  res.render("bookings", {requests: data});
});

module.exports = router;