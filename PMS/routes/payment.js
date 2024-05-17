var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    res.render("payment");
});

router.post("/main/processPayment", (req, res) => {
    const { name, cardNumber, expiryDate, cvv } = req.body;
    res.redirect("/bookings");
});

module.exports = router;
