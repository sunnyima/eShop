'use strict';
// класс товара
class GoodsItem{
    constructor ( product_name, price, id_product){
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
    }
    render (){
        return `<div class="goods-item">
                                                <h3 class="good-item__title">${this.product_name}</h3>
                                                <img class="good-item__img" src="img/sample.jpg" alt="good image"/>
                                                <p class="good-item__price">${this.price}</p>
                                                <button class="good-item__btn green-button addCartButton" onclick="cartList.addGood(${this.id_product})">В корзину</button>
                                             </div>`;
    }
}

const API_URL = 'http://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// класс списка товаров
class GoodsList{

    constructor(){
        this.goods = [];
        this.filteredGoods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`)
            .then(
                response =>
                {
                    this.goods = JSON.parse(response);
                    this.filteredGoods =JSON.parse(response);
                    this.render();
                    cb();
                },
                error => alert(`Rejected: ${error}`)
            );
    }
    render(){
        let goodsList = '';
        this.filteredGoods.forEach( good =>{
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            goodsList += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsList;
    }
    filterGoods(value){
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }
    getSumPrice(){
        let sumPrice = 0;
        this.goods.forEach( good =>{
            sumPrice += good.price;
        });
        //console.log(sumPrice);
    }
}

// класс товара корзины
class CartItem{
    constructor ( good, price, count){
        this.good = new GoodsItem(good.product_name, good.price, good.id_product);
        this.count = count;
        this.price = price;
    }
    getPrice(){
        return this.good.price * this.count;
    }
    render (){
        return `<div class="cart-goods-item"> 
                    <p>
                        <span>Название: </span>
                        <b class="cart-good-item__title">${this.good.product_name}</b>
                        <span>Цена: </span>
                        <b class="cart-good-item__price">${this.good.price}</b>
                        <span>Количество: </span>
                        <span class="cart-good-item__count">${this.count}</span>
                        <span>Общая цена: </span>
                        <span class="cart-good-item__allprice">${this.price}</span>
                    </p>
                    <button class="cart-good-item__btn green-button" onclick="cartList.deleteGood(${this.good.id_product})">Удалить</button>                   
                </div>`;
    }
}

class CartGoodsList {
    constructor(goodsList = []){
        this.goodsList = goodsList;
        this.cartList =[];
    }
    addGood(goodId){
        const idx = this.goodsList.findIndex(x => x.id_product === goodId);
        if (idx != -1) {
            if(this.cartList.length >0) {
                const idy = this.cartList.findIndex(x => x.good.id_product === goodId);
                if (idy != -1) {
                    this.cartList[idy].count += 1;
                    this.cartList[idy].price = this.cartList[idy].count * this.cartList[idy].good.price;
                } else {
                    this.cartList.push({
                        'good': this.goodsList[idx],
                        'count': 1,
                        'price': this.goodsList[idx].price
                    });
                }
            }
            else {
                this.cartList.push({
                    'good': this.goodsList[idx],
                    'count': 1,
                    'price': this.goodsList[idx].price
                });
            }
        }
        //console.log(this.cartList);
    }
    deleteGood(goodId){
        //const idx = this.cartList.findIndex(x => x.id_product === goodId);
        const idx = this.cartList.findIndex(x => x.good.id_product === goodId);
        if (idx != -1 && this.cartList[idx].count == 1) {
            // Второй параметр - число элементов, которые необходимо удалить
            this.cartList.splice(idx, 1);
        }
        else{
            this.cartList[idx].count -=1;
            this.cartList[idx].price = this.cartList[idx].count*this.cartList[idx].good.price;
        }
        this.render();
        //return false;
    }
    getSum(key){
        return this.cartList.reduce((a, b) => a + (b[key] || 0), 0);
    }
    open(url){
        this.setCartData();
        window.open(url, "_self");
    }
    render(){
        let goodsList = '';
        this.cartList.forEach( good =>{
            const goodItem = new CartItem(good.good, good.price, good.count);
            //console.log(goodItem);
            goodsList += goodItem.render();
        });
        const sum = this.getSum('price');
        document.querySelector('.cart-goods-list').innerHTML = goodsList;
        document.querySelector('.sum').innerHTML = `<b> ИТОГО : ${sum} </b>`;
    }
    // Получаем данные из LocalStorage
    getCartData(){
        this.cartList = JSON.parse(localStorage.getItem('cartList'));
        this.goodsList = JSON.parse(localStorage.getItem('goodsList'));
    }
    // Записываем данные в LocalStorage
    setCartData(){
        localStorage.setItem('cartList', JSON.stringify(this.cartList));
        localStorage.setItem('goodsList', JSON.stringify(this.goodsList));
        return false;
    }
}
function makeGETRequest(url) {
    return new Promise(function(resolve, reject) {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}