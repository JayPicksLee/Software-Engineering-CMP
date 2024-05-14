var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

router.get('/', async(req, res, next) => {
    const allUsers = await usermodel.displayUserAccounts();
    const userID = req.session.userID;
    res.render("account", {users: allUsers, userID: userID});
});


module.exports = router;