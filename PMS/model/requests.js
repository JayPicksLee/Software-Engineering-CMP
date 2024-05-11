const fs = require('fs');
const requestInfo = JSON.parse(fs.readFileSync('./requestdb.json', 'utf-8'));
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
    const all = await Request.find({});

    return all;
}

exports.getRequests=async (userID)=>{

    const all = await Request.find({userID});
    
    return all;
    }
exports.createRequest = async (userID,department, destination, arriveDate, departDate) => {
    try {
        var approvedStatus = false;
        requestInfo.push({ userID, department, destination, arriveDate, departDate, approvedStatus });

        const newRequest = new Request({userID: userID, department: department, destination: destination, arriveDate: arriveDate, departDate: departDate, approvedStatus: approvedStatus});
        const savedRequest = await newRequest.save();

        fs.writeFileSync('./requestdb.json', JSON.stringify(requestInfo));
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}