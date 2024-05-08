const fs = require('fs');
const {check, validationResult} = require("express-validator");
const userInfo = JSON.parse(fs.readFileSync('./userdb.json', 'utf-8'));

exports.getUsers=()=>{
return userInfo;
}

exports.getUserID=(username)=>{
    for(let i = 0; i< userInfo.length;i++)
    {
        if((userInfo[i].username === username))
        {
            return userInfo[i].randomId;
        }
    }
    return null;
}

exports.checkLoginDetails = (username, password)=>{
    var check = false;
    for (var i=0; i < userInfo.length; i++)
    {
        if (userInfo[i].username == username && userInfo[i].password == password)
        {
            check = true;
        }
    }   
    return check;
}

function generateRandomId(length) 
{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) 
    {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}

exports.signUpUser = (username, password, email, phoneNumber) => 
    {
    try 
    {
        const randomId = generateRandomId(8);
        const accountLevel = 0;
        //var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const errors = validationResult(req);

        console.log("Generated user id: ", randomId);

        const userExists = userInfo.some(user => user.username === username);
        if (userExists) 
        {
            throw new Error('Username already exists');
        }
        const randomIdExists = userInfo.some(user => user.randomId === randomId)
        if(randomIdExists)
        {
            throw new Error('ID already exists');
        }
    

        userInfo.push({accountLevel, randomId, username, password, email, phoneNumber});
        console.log("Pushed ", accountLevel, " ", randomId, " ", username, " ", password, " ", email, " ", phoneNumber);

        fs.writeFileSync('./userdb.json', JSON.stringify(userInfo));

    } 
    catch (error) 
    {
        throw new Error('Error saving user data: ' + error.message);
    }
}