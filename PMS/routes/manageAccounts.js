var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

router.get('/', async(req, res, next) => {
    const allUsers = await usermodel.displayUserAccounts();
    console.log(allUsers);
    res.render("manageAccounts", {users: allUsers});
});

module.exports = router;