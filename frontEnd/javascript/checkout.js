var checkoutButton = document.getElementById('checkoutButton');


checkoutButton.addEventListener('click', function(e){
  console.log('checkout.js');
  const totalObject = {total: total};
  let NewArrayWithTotal = cartItems.concat(totalObject);
  //let cartItems = cartItems.unshift(totalObject);
  let myJSONString = JSON.stringify(NewArrayWithTotal);
  console.log(cartItems);
  console.log(myJSONString);
});

