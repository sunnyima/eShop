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
                        }
                        this.showCart = !this.showCart;
                    }
                });
        },
        deleteProduct (product){
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                        this.showCart = !this.showCart;
                    }
                })
        },
        filterGoods(templ) {
            const regExp = new RegExp(templ, 'i');
            this.filtered = this.products.filter(product => regExp.test(product.product_name))
        }
    },
    mounted () {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
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

