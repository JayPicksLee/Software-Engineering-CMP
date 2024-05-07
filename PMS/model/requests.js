const fs = require('fs');
const requestInfo = JSON.parse(fs.readFileSync('./requestdb.json', 'utf-8'));

exports.getRequests=()=>{
    return requestInfo;
    }

exports.createRequest = (department, destination, arriveDate, departDate) => {
    
}