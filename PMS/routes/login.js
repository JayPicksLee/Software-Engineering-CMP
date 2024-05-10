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

router.post(
    '/login', 
    (req, res, next)=>
  {
  const username= req.body.username;
  const password = req.body.password;
  
  let loginResult = usermodel.checkLoginDetails(username, password);
  if(loginResult)
  {
    const userID = usermodel.getUserID(username);
    req.session.userID = userID;

    const userDBPath = path.join(__dirname, '..', 'userdb.json');
    const userData = JSON.parse(fs.readFileSync(userDBPath, 'utf-8'));
    
    const user = userData.find(user => user.randomId === userID);
    
    if (user) 
    {
      if (user.accountLevel === 0) 
      {
        res.redirect('/main');
      } 
      else if (user.accountLevel === 1) 
      {
        res.redirect('/mainAdmin');
      }
      else 
      {
        res.render('index', { error: true, message: "Invalid account level" });
      }
    }
  }
  else
  {
    res.render('index', {error: true});
  }
});

module.exports = router;
