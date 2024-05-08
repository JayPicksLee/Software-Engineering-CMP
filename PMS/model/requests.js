const fs = require('fs');
const requestInfo = JSON.parse(fs.readFileSync('./requestdb.json', 'utf-8'));

exports.getRequests=()=>{
    return requestInfo;
    }

exports.createRequest = (userID,department, destination, arriveDate, departDate) => {
    try {
        var approvedStatus = false;
        requestInfo.push({ userID, department, destination, arriveDate, departDate, approvedStatus });

        fs.writeFileSync('./requestdb.json', JSON.stringify(requestInfo));
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}