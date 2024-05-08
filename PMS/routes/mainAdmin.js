var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("mainAdmin", {title: 'Admin page'});
});

module.exports = router;