var express = require('express');
var router = express.Router();
const requestmodel = require('../model/requests.js');

router.get(
  '/', 
  async function(req, res) {
    try{
      let request = await requestmodel.getRequestsByUserId(req.session.userID);

      res.render("bookings", {userRequests: request});
    }catch(err){
      res.status(404).send('bookings list failed')
    }
  
});

module.exports = router;