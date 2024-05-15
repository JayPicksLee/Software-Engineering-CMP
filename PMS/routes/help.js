var express = require('express');
var router = express.Router();

router.get(
  '/', 
  function(req, res, next) {
    console.log(req.session);
    console.log(req.session.id);

    req.session.visited = true;
    req.sessionStore.get(req.session.id, (err, sessionData) =>{

      if(err){
        console.log(err);
        throw err;
      }
      console.log(sessionData);

      if(!req.session.userID){
        
        return res.status(401).send({msg: "Not authenticated"});
      }else{
        res.render("help", {title: 'Help page'});
      }
    });
  console.log(req.session.userID);

});

module.exports = router;