const parkingDialog =  document.getElementById("newParking-dialog")
const requestButtons =  document.getElementsByClassName("show-request-dialog")

function showNewParkingDialog(){
    parkingDialog.showModal()
}

function closeNewParkingDialog(){
    parkingDialog.close()
}

function showRequestDialog(id){
    const requestDialog = document.getElementById(`request-dialog-${id}`);
    requestDialog.showModal()
}

function closeRequestDialog(){
    requestButtons.close()
}