
cartText = document.getElementById("cart");

shoppingcart = document.getElementById("shopping-cart");

function cartClick(){
  console.log("click");
  const current = shoppingcart.className;
  console.log('current: ', current);
  shoppingcart.className = (current === "visible") ? "hidden" : "visible";
}
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.getElementById("search-filter-box").style.top = "0px";
    document.getElementById("search-filter-box").style.height = "930px";
    document.getElementById("search-filter-box").style.transition = ".1s";
  }
  else{
    document.getElementById("search-filter-box").style.top = "60px";
    document.getElementById("search-filter-box").style.height = "880px";
  }
}

cartText.onclick = cartClick;
