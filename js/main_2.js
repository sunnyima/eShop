var  GOODS = [
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
function renderGoodsItem ( title, price) {
    return '<div class="goods-item">' +
        '<h3 class="good-item__title">' + title + '</h3>' +
        '<img class="good-item__img" src="img/sample.jpg" alt="good image"/>' +
        '<p class="good-item__price">' + price + '</p>' +
        '<button class="good-item__btn green-button">В корзину</button>' +
        '</div>';
}

function renderGoodsList (list){
    var goodsList = [];
    list.forEach(function (element)
    {
        console.log(element);
        goodsList.push(renderGoodsItem(element.title, element.price));
    });
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

//
renderGoodsList(GOODS);