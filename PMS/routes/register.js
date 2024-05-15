var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

router.get(
  '/', 
  function(req, res, next) {

    console.log(req.session);
    console.log(req.session.id);

    req.sessionStore.get(req.session.id, (err, sessionData) =>{
      
      if(err){

        console.log(err);
        throw err;
      }
      console.log(sessionData);
    });

    //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
    req.session.visited = true;

  res.render("register", {title: 'SignUp page'});
});

router.post('/createNewUser', (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  try 
  {
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