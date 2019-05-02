'use strict';
// Фэйк АПИ
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered : [],
        cartItems : [],
        imgCatalog: 'http://placehold.it/250x150',
        showCart : false,
        cartUrl: 'getBasket.json',
        userSearch :''
    },
    methods: {
        getJson (url) {
            //console.log(url);
            return fetch (url)
                .then (result => result.json ())
                .catch (error => {
                    console.log (error)
                })
        },
        addProduct (product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data =>{
                    if(data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product)
                        if(find){
                            find.quantity++;
                        }
                        else{
                            let prod = Object.assign({quantity : 1}, product);
                            this.cartItems.push(prod);
                            this.showCart = false;
                        }

                    }
                });
        },
        deleteProduct (product){
           console.log(product.id_product);
            this.showCart = false;
        },
        filterGoods() {
            const regExp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regExp.test(product.product_name))
        }
    },
    mounted () {
        this.getJson (`${API + this.catalogUrl}`)
            .then (data => {
                for (let el of data) {
                    this.products.push (el);
                    this.filtered.push (el);
                }

            });
        this.getJson (`getProducts.json`)
            .then (data => {
                for (let el of data) {
                    this.products.push (el)
                }
            });
    }
});

