const { request } = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userID: String,
    department: String,
    destination: String,
    arriveDate: Date,
    departDate: Date,


});

const Booking = mongoose.model("Booking", bookingSchema)

exports.createBooking = async (userid) => {
    try {

        const newBooking = new Booking({userID: requestObject.userID,
             department: requestObject.department, 
             destination: requestObject.destination,
              arriveDate: requestObject.arriveDate,
               departDate: requestObject.departDate});
        console.log("E " + newBooking);
        const savedBooking = await newBooking.save();
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}