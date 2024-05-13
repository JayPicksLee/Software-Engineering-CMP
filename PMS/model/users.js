var mongoose = require('mongoose');
const bcrypt = require("bcrypt");


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
    const id = await User.findOne({username: username})

    return id.id;
}

exports.getUserStatus=async (username)=>{
    const level = await User.findOne({username: username})

    return level.accountLevel;
}

exports.checkExists = async (username)=>{
    try {

        let user = await User.findOne({username: username})
        let check = false;

        if(user !== null){
            check = true;
            return check
        }else{
            return check;
        }
        } catch (error) {
            throw new Error("Error finding username: " +error.message);
    }
};

exports.checkLoginDetails = async (username, password)=>{

    try {
        
        let user = await User.findOne({username: username})

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return false;
        }        

        return user;
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

        const passwordHashed = await bcrypt.hash(password, 8);

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
            const newUser = new User({accountLevel: isAdmin, username: username, password: passwordHashed, email: email, phoneNumber: phoneNumber});
            const savedUser = await newUser.save();
    } 
    catch (error) 
    {
        console.log('Error saving user data: ' + error.message);
    }
}

exports.displayUserAccounts = async () => 
    {
        try 
        {
            return await User.find({}, { _id: 1, username: 1, email: 1, phoneNumber: 1 });
        } 
        catch (error)
         {
            throw error;
        }
    }

