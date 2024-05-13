const paymentForm = document.getElementById('paymentForm');

var cards = 
[

]

paymentForm.addEventListener('submit', (e) => 
{
    e.preventDefault();
    var newCardNumber = document.getElementById('cardNumber').value;
    var newCardExpDate = document.getElementById('expDate').value;
    var newCVV = document.getElementById('CVV').value;
    var newCardholderName = document.getElementById('cardholderName').value;

    var newCard = {
        cardDetails: newCardNumber,
        cardExpDate: newCardExpDate,
        cvv: newCVV,
        cardholderName: newCardholderName
    }

    cards.push(newCard);
    console.log(cards);
})