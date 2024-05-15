var express = require('express');
var router = express.Router();
const requestModel = require('../model/requests.js');
const bookingModel = require('../model/bookings.js');

//GET METHOD: Rendering page with bookings and requests corresponding to the stored user id in the session.
router.get(
  '/', 
  async function(req, res) {
    try{
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;

    let request = await requestModel.getRequestsByUserId(req.session.userID);
    let booking = await bookingModel.getBookingsByUserId(req.session.userID);

    req.sessionStore.get(req.session.id, (err, sessionData) =>{
      if(err){
        console.log(err);
        throw err;
      }
      console.log(sessionData);

      if(!req.session.userID){
        return res.status(401).send({msg: "Not authenticated"});
      }else{
        
        res.render("bookings", {userRequests: request, userBookings: booking});
      }
    });
      //Getting requests and bookings from the mongo database based off the current stored user id and rendering these on the screen.
      
    }catch(err){
      res.status(404).send('bookings list failed')
    }
  
});

module.exports = router;