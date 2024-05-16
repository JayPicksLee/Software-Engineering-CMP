var express = require('express');
var router = express.Router();
const requestModel = require('../model/requests.js');
const bookingModel = require('../model/bookings.js');
const carparkModel = require('../model/carPark.js');

//GET METHOD: Rendering page with bookings and requests corresponding to the stored user id in the session.
router.get(
  '/', 
  async function(req, res) {
    try{
    console.log(req.session);
    console.log(req.session.id);

    req.session.visited = true;

    req.sessionStore.get(req.session.id, async (err, sessionData) =>{
      if(err){

        console.log(err);
        throw err;
      }
      console.log(sessionData);

      if(!req.session.userID){
        
        return res.redirect("/");
      }else{
        let request = await requestModel.getRequestsByUserId(req.session.userID);
        let booking = await bookingModel.getBookingsByUserId(req.session.userID);
        
        res.render("bookings", {userRequests: request, userBookings: booking});
      }
    });
      //Getting requests and bookings from the mongo database based off the current stored user id and rendering these on the screen.
      
    }catch(err){
      res.status(404).send('bookings list failed')
    }
  
});

//POST METHOD notifyArrival: When user arrives at destination, they can press a button letting the system know they are at their destination, this updates the databases occupied value for that carpark
router.post('/notifyArrival',
  async function(req, res){
    try {
      const carparkId = req.body.mark;
      const bookingId = req.body.bookingId;

      bookingModel.setOccupiedTrue(bookingId);

      let carpark = await carparkModel.MarkOccupy(carparkId);
      console.log(carpark);

      res.redirect("/bookings");
    } catch (error) {
      
    }
  }
)

//POST METHOD cancelBooking: User can cancel their booking by pressing a button on the page.
router.post('/cancelBooking',
  async function(req, res){
    try {
      const bookingId = req.body.cancel;

      bookingModel.deleteBooking(bookingId);

      res.redirect("/bookings");
    } catch (error) {
      
    }
  }
)


//POST METHOD notifyDeparture: After user has notified of their arrival, they can announce their departure.
router.post('/notifyDeparture',
  async function(req, res){
    try {
      const carparkId = req.body.departCarparkId;
      const bookingId = req.body.departBookingId;
      
      bookingModel.setDepartedTrue(bookingId);

      let carpark = await carparkModel.userDeparted(carparkId);

      res.redirect("/bookings");
    } catch (error) {
      
    }
  }
)
module.exports = router;