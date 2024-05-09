var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();
const requestmodel = require('../model/requests.js');

router.get('/', function(req, res, next) {

  const requestDbPath = path.join(__dirname, '..', 'requestdb.json');
  const requestData = JSON.parse(fs.readFileSync(requestDbPath, 'utf-8'));
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
  console.log("Rendering bookings");
  res.render("bookings", {data: data});
});

module.exports = router;