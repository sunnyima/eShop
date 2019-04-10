'use strict';
// класс товара
class GoodsItem{
    constructor ( title, price){
        this.title = title;
        this.price = price;
    }
    render (){
        return `<div class="goods-item">
                                                <h3 class="good-item__title">${this.title}</h3>
                                                <img class="good-item__img" src="img/sample.jpg" alt="good image"/>
                                                <p class="good-item__price">${this.price}</p>
                                                <button class="good-item__btn green-button">В корзину</button>
                                             </div>`;
    }
}

// класс списка товаров
class GoodsList{
    constructor(){
        this.goods = [];
    }
    fetchGoods(){
        this.goods =  [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { title: 'Trousers', price: 450 },
            { title: 'Jeans', price: 350 },
            { title: 'Wallet', price: 100 },
            { title: 'Hat', price: 170 },
        ];
    }
    render(){
        let goodsList = '';
        this.goods.forEach( good =>{
            const goodItem = new GoodsItem(good.title, good.price);
            goodsList += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsList;
    }
    getSumPrice(){
        let sumPrice = 0;
        this.goods.forEach( good =>{
            sumPrice += good.price;
        });
        console.log(sumPrice);
    }
}

// класс товара корзины
class CartItem{
    constructor ( title, price, count){
        this.good = new GoodsItem(title, price);
        this.count = count;
        this.price = this.getPrice();
    }
    getPrice(){
        return this.good.price * this.count;
    }
    render (){
        return `<div class="goods-item">
                                                <h3 class="good-item__title">${this.title}</h3>
                                                <img class="good-item__img" src="img/sample.jpg" alt="good image"/>
                                                <p class="good-item__price">${this.price}</p>
                                                <button class="good-item__btn green-button">В корзину</button>
                                             </div>`;
    }
}

class CartGoodsList {
    constructor(){
        this.cartList =[];
    }
    addGood(good){

    }
    deleteGood(good){

    }
    getSumPrice(){

    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.getSumPrice();