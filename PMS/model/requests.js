const mongoose = require('mongoose');

const Schema=  mongoose.Schema;

const bookingsModel = require('../model/bookings.js');

const requestSchema = new Schema({
    userID: String,
    department: String,
    destination: String,
    arriveDate: Date,
    departDate: Date,
    approvedStatus: Boolean,
    dateCreated: Date,

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


exports.createBookingFromRequest=async (requestId)=>{
    try {
        console.log("ID APPROVING: " + requestId);
        let request = await Request.findById(requestId);
        console.log(request)
        bookingsModel.createBooking(request);
        
        
    } catch (error) {
        console.log("DIDNT DLEETE");
    }
    
}

exports.deleteRequest=async (requestId)=>{
    try {
        
        await Request.findByIdAndDelete(requestId);
        
    } catch (error) {
        console.log("DIDNT DLEETE");
    }
    
}
exports.getRequestById=async (requestId)=>{
    try{
        const request = await Request.find({requestId});
        console.log(request);
        return request;
    }catch(error){
        throw new Error('Error finding request by ID: ' + error.message);
    }
}

exports.getRequestsByUserId=async (userID)=>{
    let all = await Request.find({userID});
    console.log(all);
    console.log("Finding requests for ...." + userID);
    return all;
}

exports.createRequest = async (userID,department, destination, arriveDate, departDate) => {
    try {
        var approvedStatus = false;
        var currentDateCreated = new Date();
        console.log(currentDateCreated);

        const newRequest = new Request({
             userID: userID,
             department: department, 
             destination: destination,
             arriveDate: arriveDate,
             departDate: departDate, 
             approvedStatus: approvedStatus,
            dateCreated: currentDateCreated});
               
        const savedRequest = await newRequest.save();
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }

}