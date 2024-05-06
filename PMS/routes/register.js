var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("register", {title: 'SignUp page'});
});

/* POST register page. */
router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
      // Sign up the user
      usermodel.signUpUser(username, password);
      // Redirect to login page after successful sign-up
      res.redirect('/login');
  } catch (error) {
      // Handle error if username already exists
      res.render("register", { title: 'SignUp page', error: true, message: error.message });
  }
});

module.exports = router;