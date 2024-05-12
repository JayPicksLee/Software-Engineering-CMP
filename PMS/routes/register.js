var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

//GET METHOD: Rendering register pages content.
router.get(
  '/', 
  function(req, res, next) {

  res.render("register", {title: 'SignUp page'});
});

//POST METHOD createNewUser: 
router.post(
  '/createNewUser', 
  (req, res, next) => {
  //Getting inputs from fields
  const username = req.body.username;
  const password = req.body.password;

  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  try 
  {
      console.log("post received");
    
      usermodel.signUpUser(username, password, email, phoneNumber);
      
      console.log("Signup successful");
      res.redirect('/');
      
  } 
  catch (error) 
  { 
      res.render('register', { errorMessage: error.message });
  }
});

module.exports = router;