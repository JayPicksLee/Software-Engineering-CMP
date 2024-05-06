const fs = require('fs');
const userInfo = JSON.parse(fs.readFileSync('./userdb.json', 'utf-8'));

exports.getUsers=()=>{
return userInfo;
}

exports.checkLoginDetails = (username, password)=>{
    var check = false;
    for (var i=0; i < userInfo.length; i++){
        if (userInfo[i].username == username && userInfo[i].password == password)
         {
            check = true;
         }
    }   
    return check;
}

exports.signUpUser = (username, password) => {
    try {
        // Check if username already exists
        const userExists = userInfo.some(user => user.username === username);
        if (userExists) {
            throw new Error('Username already exists');
        }

        // Add new user to user data
        userInfo.push({ username, password });

        // Write updated user data back to JSON file
        fs.writeFileSync('./userdb.json', JSON.stringify(userInfo));

    } catch (error) {
        throw new Error('Error saving user data: ' + error.message);
    }
}