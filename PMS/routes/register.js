var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("register", {title: 'SignUp page'});
});

/* POST register page. */
router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  try 
  {
      // Sign up the user
      console.log("post received");
      usermodel.signUpUser(username, password, email, phoneNumber);
      // Redirect to login page after successful sign-up
      console.log("Signup successful");
      res.redirect('/login');
      
  } catch (error) { 
      // Handle error if username already exists
      res.render("register", { title: 'SignUp page', error: true, message: error.message });
  }
});

module.exports = router;