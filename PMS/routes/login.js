var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

router.post('/', (req, res, next)=>{
  const username= req.body.username;
  const password = req.body.password;
  
  let LoginResult = usermodel.checkloginDetails(username, password);
  if(LoginResult)
  {
    res.render("login", { title:'You have just been logged in ', name: username});
  }
  else
  {
    res.render('login', {error: true});
  }

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'PMS' });
});

module.exports = router;
