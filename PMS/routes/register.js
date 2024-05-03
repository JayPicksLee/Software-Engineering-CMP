var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("register", {title: 'SignUp page'});
});

router.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // Print user input to the console
    //res.send("Username: " + username);
    res.send("Username: " + username + " || Password: " + password);
});

module.exports = router;