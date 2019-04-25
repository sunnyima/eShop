'use strict';
// Фэйк АПИ
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filteredProducts : [],
        cartProducts : [],
        imgCatalog: 'http://placehold.it/250x150'
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
            console.log (product.id_product);
        },
        delProduct (product){
           console.log(product.id_product);
        },
        filterGoods(value) {
            const regExp = new RegExp(value, 'i');
            this.filteredProducts = this.products.filter(product => regExp.test(product.product_name))
        }
    },
    mounted () {
        this.getJson (`${API + this.catalogUrl}`)
            .then (data => {
                for (let el of data) {
                    this.products.push (el);
                    this.filteredProducts.push (el);
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

