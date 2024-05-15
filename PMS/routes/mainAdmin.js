var express = require('express');
var router = express.Router();
const requestModel = require('../model/requests.js');
const carparkModel = require('../model/carPark.js');

//GET METHOD : Rendering the page with the requests and carparks stored in the database with methods from the models.
router.get
('/', 
  async function(req, res) {
  //Getting the current requests and carparks in the mongodb and rendering them on the screen
  let request = await requestModel.getRequests();
  
  let carpark = await carparkModel.getCarparks();

  if(req.session.userID != '66424281484b7968a5d38f49' || !req.session.userID ){

    return res.status(401).send({msg: "Not authenticated"});

  }else{
    res.render("mainAdmin", {userRequests: request, carparks: carpark });
  }


});

//POST METHOD CreateNewParkingLot: Creating new parking lot based off input fields in createNewParkingLot dialog box.
router.post
('/CreateNewParkingLot', 
(req, res)=>
  {

    const name = req.body.newLotName;
    const max_capacity = req.body.newLotMaxCapacity;

    carparkModel.createParkingLot(name, max_capacity);

    res.redirect('/mainAdmin');


});

//POST METHOD approveRequest: Creating booking data in database based off requests data and attributes, and then deleting that request. Thus approving the request.
router.post
('/approveRequest', 
  async (req, res)=>
  {
    let requestId = {_id: req.body.id};
    try {
      let carparkId = req.body.location;

      let name =  await carparkModel.getCarparkName(carparkId);
      try {
        requestModel.createBookingFromRequest(requestId, name, carparkId);
      } catch (error) {
        
      }
      try {
        carparkModel.CalculateOccupyAndAvailable(carparkId);
      } catch (error) {
        
      }
      try {
        requestModel.deleteRequest(requestId);
      } catch (error) {
        
      }
      
      
      res.redirect('/mainAdmin');
    } catch (error) {
      
    }

});
//POST METHOD rejectRequest: Deleting request upon button/form press, thus rejecting the request.
router.post
('/rejectRequest', 
(req, res)=>
  {
    const requestId = {_id: req.body.id};
    try {
      
      requestModel.deleteRequest(requestId);

      res.redirect("/mainAdmin");
    } catch (error) {
      
    }

});

//POST METHOD deleteLot: Deleting lot upon button/form press from the database.
router.post
('/deleteLot', 
(req, res)=>
  {
    const carparkId = {_id: req.body.id};
    try {

      carparkModel.deleteCarpark(carparkId);

      res.redirect("/mainAdmin");
    } catch (error) {
      
    }

});
module.exports = router;