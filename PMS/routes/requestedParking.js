var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("requestedParking", {title: 'Parking Request'});
});

module.exports = router;