'use strict';
//
const GOODS = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Trousers', price: 450 },
    { title: 'Jeans', price: 350 },
    { title: 'Wallet', price: 100 },
    { title: 'Hat', price: 170 },
];

//
const renderGoodsItem = ( title = '', price = 0 ) => `<div class="goods-item">
                                                <h3 class="good-item__title">${title}</h3>
                                                <img class="good-item__img" src="img/sample.jpg" alt="good image"/>
                                                <p class="good-item__price">${price}</p>
                                                <button class="good-item__btn green-button">В корзину</button>
                                             </div>`;
const renderGoodsList = (list = []) =>{
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  //console.log(goodsList);
  // по умолчинию .join() склеиваются через запятую, поэтому выводит запятые между элементами, заменила на склейку без запятой
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
};

//
renderGoodsList(GOODS);