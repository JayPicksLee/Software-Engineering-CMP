var express = require('express');
var router = express.Router();
const requestmodel = require('../model/requests.js');

router.get(
  '/', 
  function(req, res, next) {
  res.render("main", {title: 'Main page'});
});

router.get(
  '/requestedParking', 
  function(req, res, next) {
  res.render("requestedParking", {title: 'Main page'});
});


router.post(
  '/', (req, res, next)=>
  {
    const userID = req.session.userID;
    const departmentsSelect = req.body.departmentsSelect;
    const buildingsSelect = req.body.buildingsSelect;
    const arrivalSelect = req.body.arrivalSelect;
    const departureSelect = req.body.departureSelect;

    requestmodel.createRequest(userID,departmentsSelect, buildingsSelect, arrivalSelect, departureSelect);

    console.log('Department selected:', departmentsSelect);
    console.log('Building selected:', buildingsSelect);
    console.log('Arrival Date Input:', arrivalSelect);
    console.log('Departure Date Input:', departureSelect);

    res.render('requestedParking');

});

module.exports = router;
