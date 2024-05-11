const mongoose = require('mongoose');

const Schema=  mongoose.Schema;

const requestSchema = new Schema({
    userID: String,
    department: String,
    destination: String,
    arriveDate: Date,
    departDate: Date,
    approvedStatus: Boolean,

});

const Request = mongoose.model("Request", requestSchema)

exports.getRequests=async ()=>{
    let all = [];
    try{
        console.log("Finding requests ....");
         all = await Request.find();

    }catch(err){
        console.log("CANT FIND REQUESTS");
    }
    
    return all;
}

exports.rejectRequest=async (requestId)=>{
    try {
        
        await Request.findByIdAndDelete(requestId);
        
    } catch (error) {
        console.log("DIDNT DLEETE");
    }
    
}


exports.getRequestsUser=async (userID)=>{
    let all = await Request.find({userID});
    console.log("Finding requests for ...." + userID);
    return all;
}

exports.createRequest = async (userID,department, destination, arriveDate, departDate) => {
    try {
        var approvedStatus = false;

        const newRequest = new Request({userID: userID,
             department: department, 
             destination: destination,
              arriveDate: arriveDate,
               departDate: departDate, 
               approvedStatus: approvedStatus});
               
        const savedRequest = await newRequest.save();
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}