var checkoutButton = document.getElementById('checkoutButton');


checkoutButton.addEventListener('click', function(e){
  console.log('checkout.js');
  if(cartItems.length > 0){
    const totalObject = {total: total};
  let NewArrayWithTotal = cartItems.concat(totalObject);
  //let cartItems = cartItems.unshift(totalObject);
  
  let myJSONString = JSON.stringify(NewArrayWithTotal);
  console.log(cartItems);
  console.log(myJSONString);
  window.location.href = 'Checkout.html';
  }
});

