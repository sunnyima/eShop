'use strict';
// Фэйк АПИ
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        showCart: false,
        userSearch: '',
        imgCart: 'https://placehold.it/50x100',
        filtered: [],
        cartItems: [],
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        errorText : "тестовая ошибка"
    },
    methods: {
        getJson (url) {
            //console.log(url);
            return fetch (url)
                .then (result => {
                    this.$refs.error.setErrorText(this.errorText);
                    return result.json ()
                })
                .catch (error => {
                    this.$refs.error.setErrorText(error);
                    console.log (error)
                })
        },
        postJson (url, data) {
            //console.log(url);
            return fetch (url, {
                    method:'post',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then (result => result.json ())
                .catch (error => {
                    this.$refs.error.setErrorText(error);
                    console.log (error)
                })
        },
        putJson (url, data) {
            //console.log(url);
            return fetch (url, {
                    method:'put',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then (result => result.json ())
                .catch (error => {
                    this.$refs.error.setErrorText(error);
                    console.log (error)
                })
        },
        addProduct (product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++;
                        }
                    });
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.postJson( '/api/cart/', prod)
                    .then (data => {
                        if (data.result) {
                            this.cartItems.push (prod);
                        }
                    });
            }
            this.postJson( '/api/stats/', Object.assign({action:'add product to cart'}, product))
                .then (data => {
                    /*if (data.result) {
                        this.cartItems.push (find);
                    }*/
                });
        },
        deleteProduct (product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result){
                            if(find.quantity === 1){
                                this.cartItems.splice(this.cartItems.indexOf(find), 1);
                            }
                            else find.quantity--;
                        }
                    });
                this.postJson( '/api/stats/', Object.assign({action: 'delete product from cart'}, product))
                    .then (data => {
                        /*if (data.result) {
                            this.cartItems.push (find);
                        }*/
                    });
            } else {
                this.$refs.error.setErrorText('');
                console.log (error);
            }
            this.showCart = !this.showCart;
            /*this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                        this.showCart = !this.showCart;
                    }
                })*/
        },
        filterGoods(templ) {
            const regExp = new RegExp(templ, 'i');
            this.filtered = this.products.filter(product => regExp.test(product.product_name))
        }
    },
    mounted () {
        this.getJson('api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
        /*this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });*/
    }
});

