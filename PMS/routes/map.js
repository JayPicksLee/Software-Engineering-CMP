var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("map", {title: 'Map page'});
});

module.exports = router;