var express = require('express');
var router = express.Router();
const requestModel = require('../model/requests.js');

router.get('/', async (req, res, next) => {
  try {
    const userID = req.session.userID; 
    const userRequests = await requestModel.getRequestsByUserId(userID);
    res.render('account', { title: 'Account Page', userRequests, userID }); 
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;