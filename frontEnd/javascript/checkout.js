var checkoutButton = document.getElementById('checkoutButton');
var Info = localStorage.getItem("customerInfo");
var customerInfo = [];

checkoutButton.addEventListener('click', function(e){
  
  console.log('checkout.js');
  
  const totalObject = {total: total};
  customerInfo = JSON.parse(Info);
  let NewArrayWithTotal = cartItems.concat(totalObject);

  let NewArrayWithUserInfo = NewArrayWithTotal.concat(customerInfo); 
  
  //let cartItems = cartItems.unshift(totalObject);
  
  let myJSONString = JSON.stringify(NewArrayWithUserInfo);
  console.log(cartItems);
  console.log(myJSONString);
   const sendEmail = async () => {
    fetch("http://localhost:8888/message-producer/publish",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: myJSONString,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      }
      ).catch((err) => console.log(err));
  }

  
  console.log("end of checkout.js");
  
  
});

