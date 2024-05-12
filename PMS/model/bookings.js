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

exports.createBooking = async (requestObject) => {
    try {
        console.log(requestObject);
        const newBooking = new Booking({
             userID: requestObject.userID,
             department: requestObject.department, 
             destination: requestObject.destination,
             arriveDate: requestObject.arriveDate,
             departDate: requestObject.departDate
            });
            
        const savedBooking = await newBooking.save();
        console.log("Booking created: ", savedBooking);

    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}

exports.getBookingsByUserId=async (userID)=>{
    let all = await Booking.find({userID});
    return all;
}