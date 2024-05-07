const fs = require('fs');
const requestInfo = JSON.parse(fs.readFileSync('./requestdb.json', 'utf-8'));

exports.getRequests=()=>{
    return requestInfo;
    }

exports.createRequest = (department, destination, arriveDate, departDate) => {
    try {
        requestInfo.push({ department, destination, arriveDate, departDate });

        fs.writeFileSync('./requestdb.json', JSON.stringify(requestInfo));
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}