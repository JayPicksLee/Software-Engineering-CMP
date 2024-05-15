const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userID: String,
    carparkID: String,
    department: String,
    destination: String,
    arriveDate: Date,
    departDate: Date,
    isOccupied: Boolean,
    isDeparted: Boolean

});

const Booking = mongoose.model("Booking", bookingSchema)

exports.createBooking = async (requestObject, newLocation, carparkID) => {
    try {
        console.log(requestObject);
        const newBooking = new Booking({
             userID: requestObject.userID,
             carparkID: carparkID,
             department: requestObject.department, 
             destination: newLocation,
             arriveDate: requestObject.arriveDate,
             departDate: requestObject.departDate,
             isOccupied: false,
             isDeparted: false
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

exports.getBookingById=async (bookingId)=>{
    let all = await Booking.findById(bookingId);
    return all;
}

exports.setOccupiedTrue= async(bookingId)=>{

    await Booking.updateOne({ _id: bookingId}, {$set: { isOccupied: true}});

}

exports.setDepartedTrue= async(bookingId)=>{

    await Booking.updateOne({ _id: bookingId}, {$set: { isDeparted: true}});

}

exports.deleteBooking=async (bookingId)=>{
    try {
        // console.log("DELETING:" + requestId);
        await Booking.findByIdAndDelete(bookingId);
        
    } catch (error) {
        console.log("DIDNT DLEETE");
    }
    
}