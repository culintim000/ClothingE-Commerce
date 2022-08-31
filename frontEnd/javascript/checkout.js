var checkoutButton = document.getElementById('checkoutButton');
//const {customerInfo} = require('./login');


checkoutButton.addEventListener('click', function(e){
  console.log('checkout.js');
  
  const totalObject = {total: total};
  let NewArrayWithTotal = cartItems.concat(totalObject);

  //.concat(customerInfo)
  //let cartItems = cartItems.unshift(totalObject);
  
  let myJSONString = JSON.stringify(NewArrayWithTotal);
  console.log(cartItems);
  console.log(myJSONString);
 /**  const sendEmail = async () => {
    fetch("http://localhost:8888/message-producer/publish",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",

    })
  }*/


  window.location.href = 'Checkout.html';
  
});

