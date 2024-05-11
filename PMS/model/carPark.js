const fs = require('fs');
const carParksInfo = JSON.parse(fs.readFileSync('./carParks.json', 'utf-8'));

const mongoose = require('mongoose');

const Schema=  mongoose.Schema;

const carParkSchema = new Schema({
    name: String,
    max_capacity: BigInt,
    available: BigInt,
    reserved: BigInt,
    occupied: BigInt,

});

const Carpark = mongoose.model("Carpark", carParkSchema)

exports.getCarparks=async ()=>{
    const all = await Carpark.find({});
    console.log("Finding car parks");
    return all;
}

exports.deleteCarpark=async (carparkId)=>{
    try {
        console.log(carparkId);
        await Carpark.findByIdAndDelete(carparkId);
        console.log("Deleting car park");
        
        
    } catch (error) {
        console.log("DIDNT DLEETE");
    }
    
}

exports.getCarparkCapacity=async (carparkId)=>{
    const id = await Carpark.findOne({carparkId})

    return id.id;
}

exports.createParkingLot = async (name, max_capacity) => {
    try {
        const available = max_capacity;
        const reserved = 0;
        const occupied = 0;

        const newCarpark = new Carpark({name: name,
            max_capacity: max_capacity, 
            available: max_capacity,
            reserved: reserved,
            occupied: occupied, });
              
       const savedRequest = await newCarpark.save();
        
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}

exports.updateAvailableSpaces = async (carparkId, newAvailableSpaces) => {
    try {
        const carpark = await Carpark.findById(carparkId);
        if (!carpark) {
            throw new Error("Error - Could not find car park");
        }

        carpark.available = newAvailableSpaces;
        await carpark.save();
        console.log("Car park ${carparkId} now has ${newAvailableSpaces} spaces available");
    } catch (error) {
        throw new Error("Error updating available spaces: " +error.message);
    }
}
