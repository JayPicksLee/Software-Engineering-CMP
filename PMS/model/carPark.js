const fs = require('fs');
const carParksInfo = JSON.parse(fs.readFileSync('./carParks.json', 'utf-8'));

exports.getCarparks=()=>{
    return carParksInfo;
}

exports.getCarparkCapacity=(carparkId)=>{
    for(let i = 0; i< carParksInfo.length;i++)
        {
            if((carParksInfo[i].carparkId === carparkId))
            {
                return carParksInfo[i].capacity;
            }
        }
        return null;
}

exports.createParkingLot = (name, max_capacity) => {
    try {
        console.log(max_capacity);
        const available = max_capacity;
        const reserved = 0;
        const occupied = 0;

        carParksInfo.push({name, max_capacity, reserved, available, occupied});

        fs.writeFileSync('./carParks.json', JSON.stringify(carParksInfo));
        
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}

