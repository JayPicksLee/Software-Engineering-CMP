var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PMS' });
});

router.post('/', (req, res, next)=>{
  const username= req.body.username;
  const password = req.body.password;
  
  let loginResult = usermodel.checkLoginDetails(username, password);
  if(loginResult)
  {
    res.render("main", { title:username});
  }
  else
  {
    res.render('login', {error: true});
  }

});

module.exports = router;
