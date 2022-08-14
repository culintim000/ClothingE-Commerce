console.log('catalog.js');
var catalogItems = document.getElementById('catalogItems');
var addToCartBtn = document.getElementsByClassName('add-to-cart');
var removeFromCartBtn = document.getElementsByClassName('remove-from-cart');
var shoppingCartItems = document.getElementById('shoppping-cart-items');
var cartTotal = document.getElementById('total-cart');
console.log(shoppingCartItems)
window.onload = appendCatalog;

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

let items = [{
    id: 1,
  "name": "Belted Bootcut Jeans",
  "type": "Jeans",
  "color": "Blue",
  "price": "$44.99",
  "sizes": ["30", "31", "32", "33"],
  "imgurl": "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw4a37bd60/2_side_750/00466127-01.jpg?sw=1000&sh=1500"
}
,
{
    id: 2,
  "name": "Ribbed Crochet Tank Top",
  "type": "Top",
  "color": "White",
  "price": "$19.99",
  "sizes": ["S", "M", "L", "XL"],
  "imgurl": "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw98251653/7_additional_750/00463347-01.jpg?sw=1000&sh=1500"
}]


let cartItems = [];
function appendCatalog (){
  console.log('HELLO I AM TRYING TO DISPLAY THE CATALOG');
    items.forEach(items => {
        const catalogItem = document.createElement('div');
        catalogItem.classList.add('catalog-item');
        catalogItem.innerHTML = `
        <div class="catalog-item-info">
            <h3>${items.name}</h3>
            <img id="itemimage" src="${items.imgurl}">
            <p>${items.type}</p>
            <p>${items.color}</p>
            <p>${items.price}</p>
            <ul></ul>
            <button class="add-to-cart" data-id="${items.id}">Add to Cart</button>
        </div>
        `;
        
        catalog.appendChild(catalogItem);
        for (var i = 0 ; i < addToCartBtn.length; i++) {
            addToCartBtn[i].addEventListener('click' , addToCart ); 
         }
    }
    );
}

function addToCart(e){
    console.log('HELLO I AM TRYING TO ADD TO CART');
    cartItems.push(e.target.dataset.id);
    console.log("push");
    let id = e.target.getAttribute('data-id');
    let item = items.find(item => item.id == id);
    let cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
    <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-from-cart" data-id="${item.id}">Remove from Cart</button>
    </div>
    `;
    shoppingCartItems.appendChild(cartItem);
    findTotal();
    for (var i = 0 ; i < removeFromCartBtn.length; i++) {
        removeFromCartBtn[i].addEventListener('click' , removeFromCart); 
     }
    updateBadge();
    console.log(cartItems);
}

function removeFromCart(e){
    console.log('HELLO I AM TRYING TO REMOVE FROM CART');
    let id = e.target.getAttribute('data-id');
    let item = cartItems.find(item => item.id == id);
    cartItems.splice(cartItems.indexOf(item), 1);
    e.target.parentElement.parentElement.remove();
    findTotal();
    updateBadge();
}

function findTotal(){
    console.log('HELLO I AM TRYING TO FIND TOTAL');
    let total = 0;
    for (var i = 0 ; i < cartItems.length; i++) {
        let item = items.find(item => item.id == cartItems[i]);
        console.log(item.price);
        total += parseFloat(item.price.replace('$', ''));
    }
    console.log(total);
    cartTotal.innerHTML = total.toFixed(2);
}

function updateBadge(){
    console.log('HELLO I AM TRYING TO UPDATE BADGE');
    let badge = document.getElementById('number-of-items-in-cart');
    let badge2 = document.getElementById('number-of-items-in-cart2');
    badge.innerHTML = cartItems.length;
    badge2.innerHTML = cartItems.length;
}






