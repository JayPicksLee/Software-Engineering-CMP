const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    userID: String,
    dateCreated: Date,
    textContent: String,
});

const Message = mongoose.model("Message", messageSchema)

exports.createMessage = async (userId, text) => {
    try {
        var currentDateCreated = new Date();

        const newMessage = new Message({
            userID: userId,
            dateCreated: currentDateCreated,
            textContent: text,

        });
               
        const savedMessage = await newMessage.save();
        
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }

}