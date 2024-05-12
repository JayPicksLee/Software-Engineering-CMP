var express = require('express');
var router = express.Router();
const requestmodel = require('../model/requests.js');

//GET METHOD: Rendering the main page content.
router.get(
  '/', 
  function(req, res, next) {
  res.render("main", {title: 'Main page'});
});

//GET METHOD: Rendering the requestParking page upon request creation. TO DO: Look at potential removal and rendering dynamically on main page.
router.get(
  '/requestedParking', 
  function(req, res, next) {
  res.render("requestedParking", {title: 'Main page'});
});

//POST METHOD createRequest: Creating a new request that is then added to the databased based off inputs on main page. 
router.post(
  '/createRequest', 
  (req, res, next)=>
  {
    //Getting inputs from fields
    const userID = req.session.userID;
    const departmentsSelect = req.body.departmentsSelect;
    const buildingsSelect = req.body.buildingsSelect;
    const arrivalSelect = req.body.arrivalSelect;
    const departureSelect = req.body.departureSelect;

    requestmodel.createRequest(userID,departmentsSelect, buildingsSelect, arrivalSelect, departureSelect);

    res.render('requestedParking');

});

module.exports = router;
