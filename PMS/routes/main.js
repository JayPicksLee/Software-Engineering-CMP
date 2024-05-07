var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("main", {title: 'Main page'});
});

router.post('/', (req, res, next)=>
  {
    const SelectOption1 = req.body.SelectOption1;
    const SelectOption2 = req.body.SelectOption2;
    const DateInput1 = req.body.DateInput1;
    const DateInput2 = req.body.DateInput2;
    console.log('Selected Option:', selectOption1);
    console.log('Selected Option2:', selectOption2);
    console.log('Date Input:', DateInput1);
    console.log('Date Input:', DateInput2);
    res.send('Form submitted successfully.');
});

module.exports = router;
