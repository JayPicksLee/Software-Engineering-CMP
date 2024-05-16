const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    userID: String,
    dateCreated: Date,
    textContent: String,
    chatId: String,
});

const Message = mongoose.model("Message", messageSchema)
const chatSchema = new Schema({
    messages: [messageSchema],
    users: [String],

});

const Chat = mongoose.model("Chat", chatSchema);

exports.createChat = async (userId, messagesArray) => {
    try {

        const newChat = new Chat({
            messages: messagesArray,
            users:[userId, '66424281484b7968a5d38f49']

        });
               
        const savedChat = await newChat.save();

        return savedChat;

    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }

}

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

exports.getMessages=async (userID)=>{

    let all = await Message.find({userID}).sort({dateCreated: 1});

    return all;
}
