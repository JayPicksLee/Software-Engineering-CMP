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
    try {
        
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
        } catch (error) {
            throw new Error("Error finding username: " +error.message);
    }
};

exports.checkLoginDetails = async (username, password)=>{
    // var check = false;
    try {
        
        let user = await User.findOne({username: username})
        let check = false;

        if(user.password == password){
            check = true;
            return check
        }
        else{
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
    } catch (error) {
        throw new Error("Error checking login details: " +error.message);
    }
};

exports.signUpUser = async (username, password, email, phoneNumber) => 
    {
    try 
    {
        const isAdmin = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{11}$/;

        const userExists = await User.findOne({username: username})
        let check = false;

        if(userExists !== null){
            check = true
        }else{
            check = false;
        }
        console.log(check);

        if (check) 
        {
            console.log('Username already exists');
            return;
        }
        if (!emailRegex.test(email)) 
            {
            console.log('Invalid email format, please ensure it agrees with this example, example@example.com or .co.uk etc');
            return;
        }
        if (!phoneRegex.test(phoneNumber)) 
        {
            console.log('Invalid phone number format, ensure it is 11 digits long, it may need to start with a 0');
            return;
        }
            const newUser = new User({accountLevel: isAdmin, username: username, password: password, email: email, phoneNumber: phoneNumber});
            const savedUser = await newUser.save();
    } 
    catch (error) 
    {
        console.log('Error saving user data: ' + error.message);
    }
}
