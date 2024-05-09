var express = require('express');
var router = express.Router();
const requestmodel = require('../model/requests.js');

router.get('/', function(req, res, next) {

  let data = [];

  let requests = requestmodel.getRequests();
  console.log(requests);
  for (const request of requests) {
    console.log(request);
    if (request.userID === req.session.userID) {

      data.push(request);

    }else{
      res.render('bookings', { error: true, message: "Couldn't post requests" });
    }
  }
  res.render("bookings", {data: data});
});

module.exports = router;