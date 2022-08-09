
cartText = document.getElementById("cart");

shoppingcart = document.getElementById("shopping-cart");

function cartClick(){
  console.log("click");
  const current = shoppingcart.className;
  console.log('current: ', current);
  shoppingcart.className = (current === "visible") ? "hidden" : "visible";
}

cartText.onclick = cartClick;
