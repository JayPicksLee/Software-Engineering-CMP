var express = require('express');
var router = express.Router();
const requestModel = require('../model/requests.js');
const bookingModel = require('../model/bookings.js');

router.get(
  '/', 
  async function(req, res) {
    try{
      let request = await requestModel.getRequestsByUserId(req.session.userID);
      let booking = await bookingModel.getBookingsByUserId(req.session.userID);

      res.render("bookings", {userRequests: request, userBookings: booking});
    }catch(err){
      res.status(404).send('bookings list failed')
    }
  
});

module.exports = router;