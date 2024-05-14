var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

router.get('/', async(req, res, next) => {
    const allUsers = await usermodel.displayUserAccounts();
    console.log(allUsers);
    res.render("manageAccounts", {users: allUsers});
});

router.post('/deleteUserAccount', async(req, res, next) => {
    const userId = req.body.userId; 
    try {
        await usermodel.deleteUserAccount(userId);
        res.redirect('/manageAccounts');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server Error');
    }
  });
module.exports = router;