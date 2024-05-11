var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');


router.get('/', function(req, res, next) {
  res.render("register", {title: 'SignUp page'});
});


router.post('/', (req, res, next) => {
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