var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

router.get('/', async(req, res, next) => {
    const allUsers = await usermodel.displayUserAccounts();
    console.log(allUsers);
    res.render("manageAccounts", {users: allUsers});
});

router.delete('/_id', async (req, res, next) => {
    const userId = req.params._id;
    try {
        await usermodel.deleteUserAccount(userId);
        res.sendStatus(200); // Send a success response
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error'); // Send an error response
    }
});



module.exports = router;