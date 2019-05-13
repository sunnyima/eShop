Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `<div class="cart-block" v-show="visibility">
                <p v-if="!cartItems.length">Ваша корзина пуста</p>
                <cart-item 
                v-for="product of cartItems"  
                :key="product.id_product"
                :img="img"
                :cart-item="product"></cart-item>
            </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item" >
                    <div class="product-bio">
                        <img :src="img" alt="some image">
                        <div class="product-desc">
                            <p class="product-title"> {{ cartItem.product_name }} </p>
                            <p class="product-quantity"> {{ cartItem.quantity }} </p>
                            <p class="product-single-price"> $ {{ cartItem.price }} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price"> {{cartItem.quantity*cartItem.price}}</p>
                        <button class="add-button" @click="$parent.$emit('add-product', cartItem)">Добавить</button>
                        <button class="removeButton" @click="$parent.$emit('delete-product', cartItem)">Удалить</button>
                    </div>
                </div>`
})