'use strict';
const list = new GoodsList();
let cartList;
list.fetchGoods(()=>{
    cartList = new CartGoodsList(list.goods);
    cartList.getCartData();
    cartList.setCartData();
});

let addCartButton = document.querySelectorAll('addCartButton');
let searchButton = document.getElementById('searchButton');
let searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', (e) =>{
   const value = searchInput.value;
   list.filterGoods(value);
   e.preventDefault();
   return false;
});