console.log("catalog.js");
var catalogItems = document.getElementById("catalogItems");
var addToCartBtn = document.getElementsByClassName("add-to-cart");
var removeFromCartBtn = document.getElementsByClassName("remove-from-cart");
var shoppingCartItems = document.getElementById("shoppping-cart-items");
var cartTotal = document.getElementById("total-cart");
var searchButton = document.getElementById("searchButton");

////////SREACH FITLER/////////////
var title = document.getElementById("sreachName");
var type = document.getElementById("type-list");
var priceFilter = document.getElementById("price-filter");
var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');


console.log(shoppingCartItems);
window.onload = appendCatalog;



let items;
let searchFilter = {};



const handleFetchcatalog = async () => {
  await fetch("http://localhost:8888/filter-service/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchFilter),
  })
    .then((res) => res.json())
    .then((data) => {
      items = data;
      appendCatalog(items);
    }).catch((err) => console.log(err));
}


  // if(title.value.toString() != ""){
  //   searchFilter.title = title.value;
  // }
  // if(type.options[type.selectedIndex].value.toString() != "no preference"){
  //   searchFilter.type = type.options[type.selectedIndex].value;
  // }
  // if(priceFilter.value.toString() != ""){
  //   searchFilter.price = priceFilter.value;
  // }
  // color_list = [];
  // for (var checkbox of markedCheckbox ){
  //   if(checkbox.checked){
  //     color_list.push(checkbox.value.toString());
  //   }
  // }
  // if(color_list.length > 0){
  //   searchFilter.color = color_list;
  // }





/*var catalog = document.getElementById("catalog-items");
const handleFetchcatalog = async () => {
    try {
       const response = await fetch('http://localhost:8888/catalog-api/catalog/all'); 
         const data = await response.json();
        appendCatalog(data);
    } catch (err) {
        console.log(err);
    }
}*/

/*const appendCatalog = (data) => {
    data.forEach(item => {
        const catalogItem = document.createElement('p');
        catalogItem.classList.add('catalog-item');
        catalogItem.innerHTML = `
        <div class="catalog-item-info">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        </div>
        `;
        catalog.appendChild(catalogItem);
    }
    );
}*/




let total = 0;



let cartItems = [];
function appendCatalog() {
  console.log("HELLO I AM TRYING TO DISPLAY THE CATALOG");
  items.forEach((items) => {
    const catalogItem = document.createElement("div");
    catalogItem.classList.add("catalog-item");
    catalogItem.innerHTML = `
        <div class="catalog-item-info">
            <h3>${items.name}</h3>
            <img id="itemimage" src="${items.img}">
            <p>${items.type}</p>
            <p>${items.color_list}</p>
            <p>$${items.price}</p>
            <p>${items.size_list}</p>
            <a href="${items.href}">Link to Item</a>
            <ul></ul>
            <button class="add-to-cart" data-id="${items._id}">Add to Cart</button>
        </div>
        `;

    catalog.appendChild(catalogItem);
    for (var i = 0; i < addToCartBtn.length; i++) {
      addToCartBtn[i].addEventListener("click", addToCart);
    }
  });
}

function addToCart(e) {
  console.log("HELLO I AM TRYING TO ADD TO CART");
  cartItems.push(items.find((item) => item._id == e.target.getAttribute("data-id")));

  console.log("push");
  let id = e.target.getAttribute("data-id");
  let item = items.find((item) => item._id == id);
  let cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-from-cart" data-id="${item._id}">Remove from Cart</button>
    </div>
    `;
  shoppingCartItems.appendChild(cartItem);
  findTotal();
  for (var i = 0; i < removeFromCartBtn.length; i++) {
    removeFromCartBtn[i].addEventListener("click", removeFromCart);
  }
  updateBadge();
  console.log(cartItems);
}

function removeFromCart(e) {
  console.log("HELLO I AM TRYING TO REMOVE FROM CART");
  let id = e.target.getAttribute("data-id");
  let item = cartItems.find((item) => item._id == id);
  cartItems.splice(cartItems.indexOf(item), 1);
  e.target.parentElement.parentElement.remove();
  console.log(cartItems);
  findTotal();
  updateBadge();
}

function findTotal() {
  console.log("HELLO I AM TRYING TO FIND TOTAL");
  total = 0.00;
  for (var i = 0; i < cartItems.length; i++) {
    console.log(cartItems[i].price);
    total += parseFloat(cartItems[i].price);
  }
  console.log(total);
  cartTotal.innerHTML = total.toFixed(2);
}

function updateBadge() {
  console.log("HELLO I AM TRYING TO UPDATE BADGE");
  let badge = document.getElementById("number-of-items-in-cart");
  let badge2 = document.getElementById("number-of-items-in-cart2");
  badge.innerHTML = cartItems.length;
  badge2.innerHTML = cartItems.length;
}





handleFetchcatalog();