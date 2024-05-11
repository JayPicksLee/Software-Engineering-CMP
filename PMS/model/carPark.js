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