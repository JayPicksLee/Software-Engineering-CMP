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
    try {
        const all = await Carpark.find({});
        console.log("Finding car parks");
        return all;
    } catch (error) {
        throw new Error("Error getting car parks: " +error.message);
    }
}

exports.getCarparkName=async (carparkId)=>{
    try {

        let all = await Carpark.findById(carparkId); 
        let name = all.name;

        return name;
    } catch (error) {
        throw new Error("Error getting car parks: " +error.message);
    }
}


exports.getCarpark=async (carparkId)=>{
    let all = await Carpark.findById(carparkId);
    return all;
}

exports.CalculateReservedAndAvailable= async(carparkId)=>{

    let carpark = await Carpark.findById(carparkId);

    await Carpark.updateOne({ _id: carparkId }, { $inc: { available: -1 } });
    await Carpark.updateOne({ _id: carparkId }, { $inc: { reserved: +1 } });

    return carpark;

}

exports.MarkOccupy = async(carparkId)=>{

    let carpark = await Carpark.findById(carparkId);

    await Carpark.updateOne({_id: carparkId}, { $inc: {reserved: -1}});
    await Carpark.updateOne({_id: carparkId}, { $inc: {occupied: +1}});

    return carpark;
}

exports.userDeparted = async(carparkId)=>{

    let carpark = await Carpark.findById(carparkId);

    await Carpark.updateOne({_id: carparkId}, { $inc: {occupied: -1}});
    await Carpark.updateOne({_id: carparkId}, { $inc: {available: +1}});

    return carpark;
}

exports.deleteCarpark=async (carparkId)=>{
    try {
        console.log(carparkId);
        await Carpark.findByIdAndDelete(carparkId);
        console.log("Deleting car park");
        
        
    } catch (error) {
        console.log("Error deleting car park");
    }
    
}

exports.getCarparkCapacity=async (carparkId)=>{
    try {
        const id = await Carpark.findById({carparkId});
        if (!carpark) {
            throw new Error("Car park not found");
        }
        return carpark.max_capacity;
    } catch (error) {
        throw new Error("Error getting car park capacity: " +error.message);
    }
}

exports.createParkingLot = async (name, max_capacity) => {
    try {
        const available = max_capacity;
        const reserved = 0;
        const occupied = 0;

        const newCarpark = new Carpark({
            name: name,
            max_capacity: max_capacity, 
            available: max_capacity,
            reserved: reserved,
            occupied: occupied });
              
       const savedRequest = await newCarpark.save();
        
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}

exports.updateAvailableSpaces = async (carparkId, newAvailableSpaces) => {
    try {
        const carpark = await Carpark.findById(carparkId);
        if (!carpark) {
            throw new Error("Could not find car park");
        }

        carpark.available = newAvailableSpaces;
        await carpark.save();
        console.log("Car park ${carparkId} now has ${newAvailableSpaces} spaces available");
    } catch (error) {
        throw new Error("Error updating available spaces: " +error.message);
    }
}
