const fs = require('fs');
const userInfo = JSON.parse(fs.readFileSync('./userdb.json', 'utf-8'));

exports.getUsers=()=>{
return userInfo;
}

exports.checkloginDetails = (username, password)=>{
var check = false;
for (var i=0; i < userInfo.length; i++){
    if (userInfo[i].username == username && userInfo[i].password == password)
    {
        check = true;
    }
}
return check;
}