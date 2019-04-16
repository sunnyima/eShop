'use strict';
const list = new GoodsList();
let cartList;
list.fetchGoods(()=>{
    cartList = new CartGoodsList(list.goods);
    cartList.getCartData();
});