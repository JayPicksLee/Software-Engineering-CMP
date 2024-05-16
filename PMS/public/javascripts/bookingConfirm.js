document.addEventListener('DOMContentLoaded', () => {
    const bookingDialog = document.getElementById('bookingConfirmDialog');
    const bookingForm = document.getElementById('bookingForm');
    
    const modalDepartmentsSelect = document.getElementById('modalDepartmentsSelect');
    const modalBuildingsSelect = document.getElementById('modalBuildingsSelect');
    const modalArrivalSelect = document.getElementById('modalArrivalSelect');
    const modalDepartureSelect = document.getElementById('modalDepartureSelect');

    const confirmDepartment = document.getElementById('confirmDepartment');
    const confirmBuilding = document.getElementById('confirmBuilding');
    const confirmArrival = document.getElementById('confirmArrival');
    const confirmDeparture = document.getElementById('confirmDeparture');
    const confirmCharge = document.getElementById('confirmCharge');

    function calculatePayment(arrival, departure) {
        let arrivalDate = new Date(arrival);
        let departureDate = new Date(departure);
        let parkingTime = Math.ceil((departureDate - arrivalDate) / 3600000);
        let parkingCharge = 3 * parkingTime;
        return parkingCharge;
    }

    window.showBookingConfirmDialog = function() {
        const departmentsSelect = document.getElementById('departmentsSelect').value;
        const buildingsSelect = document.getElementById('buildingsSelect').value;
        const arrivalSelect = document.getElementById('arrivalSelect').value;
        const departureSelect = document.getElementById('departureSelect').value;
    
        confirmDepartment.textContent = departmentsSelect;
        confirmBuilding.textContent = buildingsSelect;
        confirmArrival.textContent = arrivalSelect;
        confirmDeparture.textContent = departureSelect;
        const charge = calculatePayment(arrivalSelect, departureSelect);
        confirmCharge.textContent = `£${charge}`+".00";
        modalDepartmentsSelect.value = departmentsSelect;
        modalBuildingsSelect.value = buildingsSelect;
        modalArrivalSelect.value = arrivalSelect;
        modalDepartureSelect.value = departureSelect;

        bookingDialog.showModal();
    };
  
    window.closeBookingConfirmDialog = function() {
      bookingDialog.close();
    };
  
    window.addEventListener('click', (event) => {
      if (event.target === bookingDialog) {
        bookingDialog.close();
      }
    });
  });
  