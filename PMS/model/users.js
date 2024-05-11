var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    accountLevel: Boolean,
    username: String,
    password: String,
    email: String,
    phoneNumber: String,

});

const User = mongoose.model("User", UserSchema)

exports.getUsers= async ()=>{
    const all = await User.find({});

    return all;
}

exports.getUser= async (username)=>{
    const user = await User.findOne({username:username})

    return user;
}

exports.getUserID=async (username)=>{

    // for(let i = 0; i< userInfo.length;i++)
    // {
    //     if((userInfo[i].username === username))
    //     {
    //         return userInfo[i].randomId;
    //     }
    // }

    const id = await User.findOne({username: username})

    return id.id;
}

exports.getUserStatus=async (username)=>{

    // for(let i = 0; i< userInfo.length;i++)
    // {
    //     if((userInfo[i].username === username))
    //     {
    //         return userInfo[i].randomId;
    //     }
    // }

    const level = await User.findOne({username: username})

    return level.accountLevel;
}

exports.checkExists = async (username)=>{
    // var check = false;
    let user = await User.findOne({username: username})
    let check = false;

    if(user !== null){
        check = true;
        return check
    }else{
        return check;
    }

    // for (var i=0; i < userInfo.length; i++)
    // {
    //     if (userInfo[i].username == username && userInfo[i].password == password)
    //     {
    //         check = true;
    //     }
    // }   
    return null;
}

exports.checkLoginDetails = async (username, password)=>{
    // var check = false;
    let user = await User.findOne({username: username})
    let check = false;

    if(user.password == password){
        check = true;
        return check
    }else{
        return check;
    }

    // for (var i=0; i < userInfo.length; i++)
    // {
    //     if (userInfo[i].username == username && userInfo[i].password == password)
    //     {
    //         check = true;
    //     }
    // }   
    return null;
}

exports.signUpUser = async (username, password, email, phoneNumber) => 
    {
    try 
    {
        const isAdmin = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{11}$/;

        const newUser = new User({accountLevel: isAdmin, username: username, password: password, email: email, phoneNumber: phoneNumber});
        const savedUser = await newUser.save();

        // const userExists = userInfo.some(user => user.username === username);
        // if (userExists) 
        // {
        //     throw new Error('Username already exists');
        // }
        // const randomIdExists = userInfo.some(user => user.randomId === randomId)
        // if(randomIdExists)
        // {
        //     throw new Error('ID already exists');
        // }
        // if (!emailRegex.test(email)) {
        //     throw new Error('Invalid email format, please ensure it agrees with this example, example@example.com or .co.uk etc');
        // }

        // if (!phoneRegex.test(phoneNumber)) {
        //     throw new Error('Invalid phone number format, ensure it is 11 digits long, it may need to start with a 0');
        // }
    
    } 
    catch (error) 
    {
        throw new Error('Error saving user data: ' + error.message);
    }
}