var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();
const usermodel = require('../model/users.js');

/* GET home page. */
router.get(
    '/', 
    function(req, res, next) {

  res.render('login', { title: 'PMS' });
  
});

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {

    const exists = await usermodel.checkExists(username);

    if (exists) {

      const userID = await usermodel.getUserID(username);
      req.session.userID = userID;
      console.log(userID);

      const user = await usermodel.checkLoginDetails(username, password);
      if (user) {
        const level = await usermodel.getUserStatus(username);
        
        if (level) { 

          res.redirect('/mainAdmin');
        } else {

          res.redirect('/main');
        }
      } else {
        console.log("Invalid login details");
        res.render('index', { error: true, message: "Invalid login details" });
      }
    } else {
      console.log("User does not exist");
      res.render('index', { error: true, message: "User does not exist" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.render('index', { error: true, message: "An error occurred" });
  }
});


module.exports = router;
