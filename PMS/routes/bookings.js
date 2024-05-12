var express = require('express');
var router = express.Router();
const requestModel = require('../model/requests.js');
const bookingModel = require('../model/bookings.js');

//GET METHOD: Rendering page with bookings and requests corresponding to the stored user id in the session.
router.get(
  '/', 
  async function(req, res) {
    try{
      //Getting requests and bookings from the mongo database based off the current stored user id and rendering these on the screen.
      let request = await requestModel.getRequestsByUserId(req.session.userID);
      let booking = await bookingModel.getBookingsByUserId(req.session.userID);

      res.render("bookings", {userRequests: request, userBookings: booking});
    }catch(err){
      res.status(404).send('bookings list failed')
    }
  
});

module.exports = router;