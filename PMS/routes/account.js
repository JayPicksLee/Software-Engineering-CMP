var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

router.get('/', async(req, res, next) => {
    console.log(req.session);
    console.log(req.session.id);

    req.session.visited = true;

    const allUsers = await usermodel.getUsers();

    req.sessionStore.get(req.session.id, (err, sessionData) =>{

      if(err){
        
        console.log(err);
        throw err;
      }
      console.log(sessionData);

      if(!req.session.userID){
        return res.redirect("/");
      }else{

        const userID = req.session.userID;
        const accountAccess = usermodel.getUserStatus;

        res.render("account", {users: allUsers, userID: userID, accountAccess: accountAccess});
      }
    });
    
   
});


module.exports = router;