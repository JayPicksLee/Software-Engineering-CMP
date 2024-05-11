const parkingDialog =  document.getElementById("newParking-dialog")
const requestDialgo =  document.getElementById("request-dialog")

function showNewParkingDialog(){
    parkingDialog.showModal()
}

function closeNewParkingDialog(){
    parkingDialog.close()
}

function showRequestDialog(){
    requestDialgo.showModal()
}

function closeRequestDialog(){
    requestDialgo.close()
}