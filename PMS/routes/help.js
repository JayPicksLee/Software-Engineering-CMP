var express = require('express');
var router = express.Router();

const messageModel = require("../model/message.js");


//GET METHOD
router.get(
  '/', 
  function(req, res, next) {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    req.sessionStore.get(req.session.id, async (err, sessionData) =>{

      if(err){
        console.log(err);
        throw err;
      }
      console.log(sessionData);

      if(!req.session.userID){
        
        return res.redirect("/");
      }else{
        
        let messages = await messageModel.getMessages(req.session.userID);
        let chat = await messageModel.createChat(req.session.userID, messages);

        console.log("CURRENT MESSAGES: " + chat.messages)
        res.render("help", {title: 'Help page', messages: chat.messages});
      }
    });
  console.log(req.session.userID);

});

//POST METHOD sendMessage:
router.post(
  '/sendMessage', 
  function(req, res, next) {

    const userId = req.session.userID;
    const textContent = req.body.message_content;

    messageModel.createMessage(userId, textContent);

    res.redirect("/help");
  });

module.exports = router;