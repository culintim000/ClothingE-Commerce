console.log('catalog.js');
var catalogItems = document.getElementById('catalogItems');
var addToCartBtn = document.getElementsByClassName('add-to-cart');;
var shoppingCartItems = document.getElementById('shopping-cart-items');
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
    }
    );

    function addToCart(e){
        console.log('HELLO I AM TRYING TO ADD TO CART');
        cartItems.push(e.target.dataset.id);
        let id = e.target.getAttribute('data-id');
        let item = items.find(item => item.id == id);
        let cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>${item.type}</p>
            <p>${item.color}</p>
            <p>${item.price}</p>
            <button class="remove-from-cart" data-id="${item.id}">Remove from Cart</button>
        </div>
        `;
        cart.appendChild(shoppingCartItems);
        console.log(cartItems);
    }

    addToCartBtn.addEventListener('click', addToCart);



}