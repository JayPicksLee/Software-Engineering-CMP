var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

router.get('/', async(req, res, next) => {
    const allUsers = await usermodel.getUsers();
    const userID = req.session.userID;
    const accountAccess = usermodel.getUserStatus;
    res.render("account", {users: allUsers, userID: userID, accountAccess: accountAccess});
});


module.exports = router;