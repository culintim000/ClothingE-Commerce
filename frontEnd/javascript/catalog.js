console.log("catalog.js");
var catalogItems = document.getElementById("catalogItems");
var addToCartBtn = document.getElementsByClassName("add-to-cart");
var removeFromCartBtn = document.getElementsByClassName("remove-from-cart");
var shoppingCartItems = document.getElementById("shoppping-cart-items");
var cartTotal = document.getElementById("total-cart");
var searchButton = document.getElementById("searchButton");
console.log(shoppingCartItems);
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

let items = [
  {
    _id: {
      $oid: "62fd1b03f49e20016f824e8f",
    },
    img: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw6ad1ef7c/1_front_750/00464419-02.jpg?sw=276&amp;sh=414",
    name: "Plus Size Contrast-Trim Tie-Front Top",
    href: "https://www.forever21.com/us/2000464419.html?dwvar_2000464419_color=02",
    price: 22.99,
    type: "top",
    size_list: ["0X/1X", "2X/3X", "3X/4X", "unselectable"],
    color_list: ["BLACK", "DUSTY PINK", "CLOUD"],
  },
  {
    _id: {
      $oid: "62fd1b03f49e20016f824e90",
    },
    img: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb694fc7c/1_front_750/00455959-01.jpg?sw=276&amp;sh=414",
    name: "Plus Size Ruffle-Trim Smocked Top",
    href: "https://www.forever21.com/us/2000455959.html?dwvar_2000455959_color=01",
    price: 19.99,
    type: "top",
    size_list: ["0X", "1X", "2X", "3X"],
    color_list: ["CREAM", "BLACK"],
  },
  {
    _id: {
      $oid: "62fd1b03f49e20016f824e8f",
    },
    img: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw6ad1ef7c/1_front_750/00464419-02.jpg?sw=276&amp;sh=414",
    name: "Plus Size Contrast-Trim Tie-Front Top",
    href: "https://www.forever21.com/us/2000464419.html?dwvar_2000464419_color=02",
    price: 22.99,
    type: "top",
    size_list: ["0X/1X", "2X/3X", "3X/4X", "unselectable"],
    color_list: ["BLACK", "DUSTY PINK", "CLOUD"],
  },
  {
    _id: {
      $oid: "62fd1b03f49e20016f824e90",
    },
    img: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb694fc7c/1_front_750/00455959-01.jpg?sw=276&amp;sh=414",
    name: "Plus Size Ruffle-Trim Smocked Top",
    href: "https://www.forever21.com/us/2000455959.html?dwvar_2000455959_color=01",
    price: 19.99,
    type: "top",
    size_list: ["0X", "1X", "2X", "3X"],
    color_list: ["CREAM", "BLACK"],
  },
  {
    _id: {
      $oid: "62fd1b03f49e20016f824e8f",
    },
    img: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw6ad1ef7c/1_front_750/00464419-02.jpg?sw=276&amp;sh=414",
    name: "Plus Size Contrast-Trim Tie-Front Top",
    href: "https://www.forever21.com/us/2000464419.html?dwvar_2000464419_color=02",
    price: 22.99,
    type: "top",
    size_list: ["0X/1X", "2X/3X", "3X/4X", "unselectable"],
    color_list: ["BLACK", "DUSTY PINK", "CLOUD"],
  },
  {
    _id: {
      $oid: "62fd1b03f49e20016f824e90",
    },
    img: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb694fc7c/1_front_750/00455959-01.jpg?sw=276&amp;sh=414",
    name: "Plus Size Ruffle-Trim Smocked Top",
    href: "https://www.forever21.com/us/2000455959.html?dwvar_2000455959_color=01",
    price: 19.99,
    type: "top",
    size_list: ["0X", "1X", "2X", "3X"],
    color_list: ["CREAM", "BLACK"],
  },
  {
    _id: {
      $oid: "62fd1b03f49e20016f824e8f",
    },
    img: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw6ad1ef7c/1_front_750/00464419-02.jpg?sw=276&amp;sh=414",
    name: "Plus Size Contrast-Trim Tie-Front Top",
    href: "https://www.forever21.com/us/2000464419.html?dwvar_2000464419_color=02",
    price: 22.99,
    type: "top",
    size_list: ["0X/1X", "2X/3X", "3X/4X", "unselectable"],
    color_list: ["BLACK", "DUSTY PINK", "CLOUD"],
  },
  {
    _id: {
      $oid: "62fd1b03f49e20016f824e90",
    },
    img: "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb694fc7c/1_front_750/00455959-01.jpg?sw=276&amp;sh=414",
    name: "Plus Size Ruffle-Trim Smocked Top",
    href: "https://www.forever21.com/us/2000455959.html?dwvar_2000455959_color=01",
    price: 19.99,
    type: "top",
    size_list: ["0X", "1X", "2X", "3X"],
    color_list: ["CREAM", "BLACK"],
  },
];

let total = 0;

/** 
{  }
**/

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
            <button class="add-to-cart" data-id="${items._id.$oid}">Add to Cart</button>
        </div>
        `;

    catalog.appendChild(catalogItem);
    console.log(catalogItem);
    for (var i = 0; i < addToCartBtn.length; i++) {
      addToCartBtn[i].addEventListener("click", addToCart);
    }
  });
}

function addToCart(e) {
  console.log("HELLO I AM TRYING TO ADD TO CART");
  cartItems.push(items.find((item) => item._id.$oid == e.target.getAttribute("data-id")));

  console.log("push");
  let id = e.target.getAttribute("data-id");
  let item = items.find((item) => item._id.$oid == id);
  let cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-from-cart" data-id="${item._id.$oid}">Remove from Cart</button>
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
  let item = cartItems.find((item) => item.id == id);
  cartItems.splice(cartItems.indexOf(item), 1);
  e.target.parentElement.parentElement.remove();
  console.log(cartItems);
  findTotal();
  updateBadge();
}

function findTotal() {
  console.log("HELLO I AM TRYING TO FIND TOTAL");
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



searchButton.onclick = function () {
  console.log("HELLO I AM TRYING TO SEARCH");
}