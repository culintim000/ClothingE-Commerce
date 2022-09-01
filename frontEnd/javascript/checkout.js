var checkoutButton = document.getElementById('checkoutButton');
var Info = localStorage.getItem("customerInfo");
var customerInfo = [];

checkoutButton.addEventListener('click', function(e){
  
  console.log('checkout.js');
  
  const totalObject = {total: total.toFixed(2)};
  customerInfo = JSON.parse(Info);
  let NewArrayWithTotal = cartItems.concat(totalObject);

  let NewArrayWithUserInfo = NewArrayWithTotal.concat(customerInfo); 
  
  //let cartItems = cartItems.unshift(totalObject);
  
  let myJSONString = JSON.stringify(NewArrayWithUserInfo);
  console.log(cartItems);
  console.log(myJSONString);
  
  const sendEmail = async () => {
    await fetch("http://localhost:8888/message-producer/publish",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: myJSONString,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Success:", res);
      }
      ).catch((err) => console.log(err));
  }

  sendEmail();

  window.location.href = "Checkout.html";

  console.log("end of checkout.js");
  
  
});

