var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

//GET METHOD: Rendering login page upon site start up
router.get(
    '/', 
    function(req, res, next) {
      console.log(req.session.userID);

  res.render('login', { title: 'PMS' });
  
});

//POST METHOD login: Logging in the user by checking if the user first exists, and then checking the users login details (username, password). The users account level is then checked in order to direct them to the correct page.
router.post(
  '/login', 
  async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  try {
    //Checking if the username inputted exists
    const exists = await usermodel.checkExists(username);

    if (exists) {

      const userID = await usermodel.getUserID(username);
      req.session.userID = userID;
      
      //Checking user details
      const user = await usermodel.checkLoginDetails(username, password);

      if (user) {
        
        const level = await usermodel.getUserStatus(username);
        //Checking user status to differentiate user and admin
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
